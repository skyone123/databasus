# Security remediation plan

Based on a third-party Trivy scan against `databasus/databasus@sha256:5676...7b97b` (v3.33.0). All findings below are verified against the current code in this repo — versions, file paths, and behaviors are confirmed real.

Order is by combined risk × ease, not by CVSS.

---

## 1. Fix deterministic AES-GCM nonce in field encryption (CRITICAL — own code)

**Where:** `backend/internal/util/encryption/secret_key_field_encryptor.go:48,112-121`

**The bug:** `deriveNonce(itemID, masterKey, nonceSize)` returns `HMAC-SHA256(masterKey, itemID)[:12]`. The nonce is fully determined by `itemID` + `masterKey`. Re-encrypting the same field on the same item (e.g. user rotates a DB password, S3 key, Slack bot token, Google Drive refresh token) reuses the same `(key, nonce)` pair on different plaintexts.

**Impact:** Nonce reuse under AES-GCM is catastrophic, not just a weakening of authentication:
- XOR of any two plaintexts encrypted under the same `(key, nonce)` is recoverable from the XOR of their ciphertexts.
- The GHASH authentication subkey `H` becomes recoverable, allowing forgery of valid auth tags for arbitrary chosen ciphertexts under that key.

**Reach:** This encryptor is used for every secret stored in the app — see callers in:
- `backend/internal/features/databases/databases/{postgresql,mysql,mariadb,mongodb}/model.go` — DB passwords
- `backend/internal/features/notifiers/models/{slack,telegram,teams,discord,email_notifier,webhook}/model.go` — bot tokens, webhook URLs, SMTP passwords, header values
- `backend/internal/features/storages/models/{s3,azure_blob,sftp,ftp,nas,google_drive,rclone}/model.go` — access keys, secret keys, connection strings, private keys, OAuth tokens

**Fix:**
- Replace `deriveNonce` with `crypto/rand.Read` to generate a fresh 12-byte random nonce for each `Encrypt` call.
- The on-wire format `enc:<base64-nonce>:<base64-ciphertext>` already stores the nonce alongside the ciphertext, so no schema migration is needed — `Decrypt` already reads the nonce from the format.
- `itemID` parameter becomes unused in `Encrypt`; either drop it from the interface or keep it as `_` argument for additional-data binding (recommend the latter — pass `itemID[:]` as AAD to `gcm.Seal`/`gcm.Open` so a ciphertext can't be moved between rows).
- Existing ciphertexts decrypt unchanged (same format, same key) — no data migration needed.

**Tests:**
- Add `Test_Encrypt_SameItem_TwiceWithDifferentPlaintext_ProducesDifferentNonces` — verify two encryptions of the same `itemID` produce different `<nonce>` parts.
- Update `Test_Encrypt_AlreadyEncrypted_ReturnsAsIs` — current behavior (idempotent on already-encrypted input) stays.
- If AAD binding is added: `Test_Decrypt_WithDifferentItemID_Fails` — ciphertext for item A must not decrypt under item B's ID.

---

## 2. Replace Debian rclone package with source build

**Where:** `Dockerfile:127` — `rclone` is currently installed via `apt-get install`, which on Debian bookworm pulls `rclone 1.60.1+dfsg-2+b5` compiled with Go 1.21.12. That binary carries its own ~15 stdlib/x-crypto/grpc CVEs entirely separate from the main Go binaries.

We already depend on `github.com/rclone/rclone v1.72.1` as a Go library (`backend/go.mod:22`), and the report recommends bumping to v1.73.5.

**Approach options:**

**Option A — Compile rclone CLI from source in a build stage** (recommended):
- Add a new build stage `FROM --platform=$BUILDPLATFORM golang:1.26.2 AS rclone-build` that clones rclone at the chosen tag and runs `go build` for both target archs.
- Drop `rclone` from the `apt-get install` line.
- `COPY --from=rclone-build /rclone-binaries/... /usr/local/bin/rclone` in the runtime stage.

**Option B — Drop the CLI entirely** if all rclone usage in the backend is via the Go library and never shells out to the binary. Worth grepping `exec.Command("rclone"` and `Path("rclone")` first.

**Steps:**
1. `grep -rn "rclone" backend/ agent/ Dockerfile` — list all CLI usages.
2. If any shell-out exists, go with Option A; else Option B.
3. Bump `github.com/rclone/rclone` in `backend/go.mod` to v1.73.5 either way (closes two critical CVEs in the library code path).
4. Verify image scan after rebuild — the ~15 stale-Go-1.21 CVEs should disappear.

---

## 3. Default external `sslmode` to `require`, not `prefer` (BREAKING — discuss first)

**Where:**
- `backend/internal/features/backups/backups/usecases/postgresql/create_backup_uc.go:462,465`
- `backend/internal/features/restores/usecases/postgresql/restore_backup_uc.go:730,733`
- `backend/internal/features/databases/databases/postgresql/model.go:1158-1170`

Currently external connections fall back to `PGSSLMODE=prefer`, which silently downgrades to plaintext if the server rejects TLS. `require` enforces TLS but errors out for self-signed-only or non-TLS PG instances.

**This is user-visible behavior change.** Need product call before shipping:
- Option A: change default to `require`, add an explicit per-database opt-out toggle in the UI for users with non-TLS PG.
- Option B: keep `prefer`, surface a warning in the UI when a connection negotiated plaintext.

Recommend Option A — safer default, opt-out is rare.

---

## Sequencing

| Order | Item | Rationale |
|---|---|---|
| 1 | Nonce fix (#1) | Own-code crypto bug; small diff; high impact |
| 2 | rclone source build + bump (#2) | Larger Dockerfile change, biggest CVE-count win |
| 3 | sslmode default (#3) | Needs product decision before code |

Item 1 is a pure code fix and can ship in a single PR. Item 2 needs Dockerfile + go.mod work. Item 3 needs a product call.
