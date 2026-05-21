import type { Metadata } from "next";
import DocsNavbarComponent from "../components/DocsNavbarComponent";
import DocsSidebarComponent from "../components/DocsSidebarComponent";
import DocTableOfContentComponent from "../components/DocTableOfContentComponent";

export const metadata: Metadata = {
  title: "Advanced config - Databasus Documentation",
  description:
    "Optional environment variables for self-hosting Databasus: Google and GitHub sign-in, SMTP email, Cloudflare Turnstile captcha, telemetry, log shipping, multi-node mode and external database or cache connections. Not needed for a default install.",
  keywords: [
    "Databasus environment variables",
    "Databasus advanced configuration",
    "self-hosted configuration",
    "GitHub OAuth",
    "Google OAuth",
    "SMTP email setup",
    "Cloudflare Turnstile",
    "Docker environment variables",
    "multi-node mode",
  ],
  openGraph: {
    title: "Advanced config - Databasus Documentation",
    description:
      "Optional environment variables for self-hosting Databasus: Google and GitHub sign-in, SMTP email, Cloudflare Turnstile captcha, telemetry, log shipping, multi-node mode and external database or cache connections. Not needed for a default install.",
    type: "article",
    url: "https://databasus.com/advanced-config",
  },
  twitter: {
    card: "summary",
    title: "Advanced config - Databasus Documentation",
    description:
      "Optional environment variables for self-hosting Databasus: Google and GitHub sign-in, SMTP email, Cloudflare Turnstile captcha, telemetry, log shipping, multi-node mode and external database or cache connections. Not needed for a default install.",
  },
  alternates: {
    canonical: "https://databasus.com/advanced-config",
  },
  robots: "index, follow",
};

export default function AdvancedConfigPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "Advanced config - Databasus Documentation",
            description:
              "Optional environment variables for self-hosting Databasus: Google and GitHub sign-in, SMTP email, Cloudflare Turnstile captcha, telemetry, log shipping, multi-node mode and external database or cache connections. Not needed for a default install.",
            author: {
              "@type": "Organization",
              name: "Databasus",
            },
            publisher: {
              "@type": "Organization",
              name: "Databasus",
              logo: {
                "@type": "ImageObject",
                url: "https://databasus.com/logo.svg",
              },
            },
          }),
        }}
      />

      <DocsNavbarComponent />

      <div className="flex min-h-screen bg-[#0F1115]">
        {/* Sidebar */}
        <DocsSidebarComponent />

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-blue max-w-none">
              <h1 id="advanced-config">Advanced config</h1>

              <p className="text-lg text-gray-400">
                Databasus runs with sensible defaults out of the box — a
                standard single-container install needs no configuration at all.
                Every variable on this page is <strong>optional</strong>. The
                most of these variables are used for cloud. As Databasus is
                fully open source, anyone can use these variables as well
                despite they are not needed in 99% of production setups
              </p>

              <h2 id="oauth">OAuth</h2>

              <p>
                By default Databasus uses email and password sign-in. You can
                additionally let people sign in with their Google or GitHub
                account. A provider&apos;s button appears as soon as its client
                ID is set, but sign-in only completes when <strong>both</strong>{" "}
                the client ID and the client secret are present.
              </p>

              <p>
                When you register the OAuth application, set its redirect
                (callback) URL to{" "}
                <code>https://&lt;your-domain&gt;/auth/callback</code>. Because
                of that redirect, OAuth sign-in needs your instance served over
                HTTPS on a public domain — see the note below.
              </p>

              <div className="bg-[#1f2937]/50 border border-[#ffffff20] border-l-[3px] border-l-blue-500 rounded-lg px-4 py-4 flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mt-0.5 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <div>
                  <p className="text-gray-300 my-0!">
                    <strong>HTTPS is required for sign-in and email.</strong>{" "}
                    OAuth sign-in and email both need your instance reachable
                    over HTTPS on a public domain — OAuth providers redirect the
                    browser back to{" "}
                    <code>https://&lt;your-domain&gt;/auth/callback</code>, and
                    links inside emails must open for whoever receives them. A
                    localhost-only or plain-HTTP instance cannot use these
                    features. The simplest way to get HTTPS is the{" "}
                    <a
                      href="/installation/#caddy-reverse-proxy"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Caddy reverse proxy
                    </a>{" "}
                    setup.
                  </p>
                </div>
              </div>

              <h3 id="oauth-google">Google</h3>

              <p>
                Create an OAuth client in the{" "}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Google Cloud Console
                </a>{" "}
                (APIs &amp; Services → Credentials → Create credentials → OAuth
                client ID, application type <em>Web application</em>) and add{" "}
                <code>https://&lt;your-domain&gt;/auth/callback</code> as an
                authorized redirect URI.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>GOOGLE_CLIENT_ID</code>
                    </td>
                    <td data-label="Description">
                      Client ID of your Google OAuth client. Setting it shows
                      the &quot;Sign in with Google&quot; button.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>GOOGLE_CLIENT_SECRET</code>
                    </td>
                    <td data-label="Description">
                      Client secret of your Google OAuth client. Required
                      together with the ID for sign-in to work.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="oauth-github">GitHub</h3>

              <p>
                Create an OAuth app under{" "}
                <a
                  href="https://github.com/settings/developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  GitHub Developer settings
                </a>{" "}
                (Settings → Developer settings → OAuth Apps → New OAuth App) and
                set the authorization callback URL to{" "}
                <code>https://&lt;your-domain&gt;/auth/callback</code>.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>GITHUB_CLIENT_ID</code>
                    </td>
                    <td data-label="Description">
                      Client ID of your GitHub OAuth app. Setting it shows the
                      &quot;Sign in with GitHub&quot; button.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>GITHUB_CLIENT_SECRET</code>
                    </td>
                    <td data-label="Description">
                      Client secret of your GitHub OAuth app. Required together
                      with the ID for sign-in to work.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="email-smtp">Email (SMTP)</h2>

              <p>
                Connect an SMTP server so Databasus can send transactional email
                such as password-reset links and workspace invitations. Email is
                treated as configured{" "}
                <strong>
                  only when both <code>SMTP_HOST</code> and{" "}
                  <code>DATABASUS_URL</code> are set
                </strong>{" "}
                — until then, email features stay hidden in the UI.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>SMTP_HOST</code>
                    </td>
                    <td data-label="Description">
                      SMTP server hostname (e.g. <code>smtp.gmail.com</code>).
                      Enables email together with <code>DATABASUS_URL</code>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>SMTP_PORT</code>
                    </td>
                    <td data-label="Description">
                      SMTP server port (e.g. <code>587</code>). Must be a
                      positive integer when <code>SMTP_HOST</code> is set.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>SMTP_USER</code>
                    </td>
                    <td data-label="Description">
                      Username for SMTP authentication.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>SMTP_PASSWORD</code>
                    </td>
                    <td data-label="Description">
                      Password for SMTP authentication. For Gmail, use an App
                      Password — not your account password.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>SMTP_FROM</code>
                    </td>
                    <td data-label="Description">
                      The &quot;From&quot; address on outgoing email.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>DATABASUS_URL</code>
                    </td>
                    <td data-label="Description">
                      Public base URL of your instance (e.g.{" "}
                      <code>https://backup.example.com</code>). Used to build
                      links inside emails. Required together with{" "}
                      <code>SMTP_HOST</code>.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="signup-captcha">
                Sign up captcha (Cloudflare Turnstile)
              </h2>

              <p>
                If your instance is reachable from the public internet, you can
                put a{" "}
                <a
                  href="https://www.cloudflare.com/products/turnstile/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Cloudflare Turnstile
                </a>{" "}
                challenge on the sign-up and sign-in forms to keep bots out.
                Both keys come from the Turnstile dashboard, and the challenge
                activates only when both are set.
              </p>

              <div className="bg-[#1f2937]/50 border border-[#ffffff20] border-l-[3px] border-l-blue-500 rounded-lg px-4 py-4 flex items-start gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-500 mt-0.5 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <div>
                  <p className="text-gray-300 my-0!">
                    To stop external sign-ups entirely rather than just
                    challenging them, you do not need a captcha at all — open{" "}
                    <strong>Databasus settings → Allow sign up</strong> in the
                    UI and turn it off. That closes the sign-up form completely.
                  </p>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>CLOUDFLARE_TURNSTILE_SITE_KEY</code>
                    </td>
                    <td data-label="Description">
                      Public Turnstile site key, used to render the widget in
                      the browser.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>CLOUDFLARE_TURNSTILE_SECRET_KEY</code>
                    </td>
                    <td data-label="Description">
                      Secret Turnstile key, used by the backend to validate
                      challenge responses.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="disable-cloud-notice">Disable cloud notice</h2>

              <p>
                Databasus shows small in-app notices promoting the cloud
                version. We want to be transparent about why it is there: cloud
                subscriptions fund the open source development, so the notice is
                part of the trade-off that keeps Databasus free and maintained.
                At the same time, we know many DevOps and DBA companies deploy
                Databasus for their own customers and would rather not highlight
                that a cloud version exists. Some users simply prefer not to see
                the label. That is a fair ask, so the notice can be switched off
                entirely with <code>IS_DISABLE_CLOUD_NOTICE</code>.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>IS_DISABLE_CLOUD_NOTICE</code>
                    </td>
                    <td data-label="Default">
                      <code>false</code>
                    </td>
                    <td data-label="Description">
                      Set to <code>true</code> to hide the in-app notice that
                      promotes the cloud version.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="telemetry">Telemetry</h2>

              <p>
                Databasus sends anonymous, non-identifying usage telemetry by
                default. It carries no personal data and helps us understand how
                the project is used. You can read exactly what is collected in
                the{" "}
                <a
                  href="/privacy"
                  className="text-blue-400 hover:text-blue-300"
                >
                  privacy policy
                </a>
                , and you can turn it off completely.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>IS_DISABLE_ANONYMOUS_TELEMETRY</code>
                    </td>
                    <td data-label="Default">
                      <code>false</code>
                    </td>
                    <td data-label="Description">
                      Set to <code>true</code> to disable anonymous usage
                      telemetry.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="log-shipping">Log shipping</h2>

              <p>
                By default Databasus keeps its application logs inside the
                container. If you run central log aggregation, you can ship them
                to an external VictoriaLogs instance instead. Setting{" "}
                <code>VICTORIA_LOGS_URL</code> enables shipping; the username
                and password are only needed if your endpoint requires basic
                auth.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>VICTORIA_LOGS_URL</code>
                    </td>
                    <td data-label="Default">—</td>
                    <td data-label="Description">
                      URL of a VictoriaLogs instance to ship application logs
                      to. Leave unset to keep logs in the container.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>VICTORIA_LOGS_USERNAME</code>
                    </td>
                    <td data-label="Default">—</td>
                    <td data-label="Description">
                      Username for the VictoriaLogs endpoint, if it requires
                      basic auth.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>VICTORIA_LOGS_PASSWORD</code>
                    </td>
                    <td data-label="Default">—</td>
                    <td data-label="Description">
                      Password for the VictoriaLogs endpoint, if it requires
                      basic auth.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="analytics-script">Analytics script</h2>

              <p>
                Databasus can inject your own analytics or tracking snippet —
                Google Analytics, Plausible, Umami and similar into the app.
                When <code>ANALYTICS_SCRIPT</code> is set, its value is inserted
                into the page <code>&lt;head&gt;</code> at startup.
              </p>

              <p>
                <strong>Security warning:</strong> the value is injected
                verbatim as raw HTML and JavaScript and runs with full access to
                the Databasus UI in every visitor&apos;s browser. Only ever set
                it to a snippet you fully control and trust.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>ANALYTICS_SCRIPT</code>
                    </td>
                    <td data-label="Description">
                      Custom <code>&lt;script&gt;</code> markup injected before
                      the closing <code>&lt;/head&gt;</code> tag. Leave unset to
                      add no analytics.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h2 id="multi-node-mode">Multi-node mode</h2>

              <p>
                By default Databasus runs as a single self-contained container —
                one image with everything inside. Multi-node mode is an advanced
                setup that splits backup processing across several machines for
                much higher throughput. Almost no installation needs it. The
                sections below explain that default design first, then the
                variables for running Databasus across multiple nodes.
              </p>

              <h3 id="why-bundled">
                Why Databasus bundles PostgreSQL and Valkey
              </h3>

              <p>
                Databasus uses PostgreSQL as its internal storage (backup
                metadata, database configurations, audit logs, etc.) and Valkey
                for caching. Both are bundled inside the image. Here is why:
              </p>

              <p>
                <strong>For users:</strong>
              </p>

              <ul>
                <li>
                  <strong>You only pull one image</strong> — no extra configs,
                  no managing other images, no tracking internal service
                  versions, no environment variables to set. Just run{" "}
                  <code>docker run</code>, even if you manage hundreds of
                  databases.
                </li>
                <li>
                  <strong>Auto-update covers everything</strong> — enable
                  auto-update for the Databasus image and forget about it. There
                  are no separate upgrade guides for internal services and no
                  multiple image versions to keep in sync.
                </li>
                <li>
                  <strong>
                    The <a href="/faq#backup-databasus">backup guide</a> just
                    works
                  </strong>{" "}
                  — it is written around the internal PostgreSQL. With an
                  external database you would have to figure out its backup
                  separately.
                </li>
              </ul>

              <p>
                <strong>For Databasus maintainers:</strong>
              </p>

              <ul>
                <li>
                  <strong>We know exactly what is inside the image</strong> — we
                  control migrations, extensions and service configuration. That
                  means we can safely bump internal service versions without
                  breaking compatibility and stay focused on development.
                </li>
                <li>
                  <strong>
                    Users never have to touch their compose files for upgrades
                  </strong>{" "}
                  — PostgreSQL and Valkey versions are updated inside the image.
                  With external services, many users would skip or delay upgrade
                  steps and run into compatibility issues across versions.
                </li>
              </ul>

              <p>
                Summing up, it is a reasonable approach for projects which focus
                on simple UX and do not face hundreds of RPS. GitLab CE, for
                example, follows the same approach.
              </p>

              <p>
                <strong>What about performance overhead?</strong> — there is
                none worth noting. Databasus is network-intensive (uploading and
                downloading backup files to remote storage), not
                database-intensive. The internal PostgreSQL typically uses
                100–150 MB of RAM for hundreds of backup jobs across hundreds of
                databases with millions of backup records. If you increase your
                server resources it scales accordingly, so there is no realistic
                chance of reaching a vertical scaling limit.
                <br />
                <br />
                Both services are only accessible inside the container
                (PostgreSQL runs on port <code>5437</code>, Valkey binds to{" "}
                <code>127.0.0.1</code> only) and are never exposed externally.
              </p>

              <h3 id="configuring-nodes">Configuring nodes</h3>

              <p>
                Set <code>IS_MANY_NODES_MODE</code> to <code>true</code>, then
                mark each node&apos;s role with the variables below. While{" "}
                <code>IS_MANY_NODES_MODE</code> is left unset, a single node
                acts as both the primary and a processing node. Multi-node mode
                also requires every node to share one external PostgreSQL and
                Valkey — see External services configuration below.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>IS_MANY_NODES_MODE</code>
                    </td>
                    <td data-label="Default">
                      <code>false</code>
                    </td>
                    <td data-label="Description">
                      Set to <code>true</code> to enable multi-node operation.
                      The role variables below take effect only when this is on.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>IS_PRIMARY_NODE</code>
                    </td>
                    <td data-label="Default">—</td>
                    <td data-label="Description">
                      Set to <code>true</code> on the primary node, which runs
                      scheduling.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>IS_PROCESSING_NODE</code>
                    </td>
                    <td data-label="Default">—</td>
                    <td data-label="Description">
                      Set to <code>true</code> on nodes that run backup
                      processing.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>NODE_NETWORK_THROUGHPUT_MBPS</code>
                    </td>
                    <td data-label="Default">
                      <code>125</code>
                    </td>
                    <td data-label="Description">
                      Node network throughput in MB/s, used when scheduling work
                      across nodes.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3 id="external-services">External services configuration</h3>

              <p>
                Databasus can run against an external PostgreSQL and Valkey
                instead of the bundled ones. This is what multi-node mode needs,
                since every node must share the same database and cache.
              </p>

              <div className="my-4 rounded-r border-l-4 border-red-500 bg-red-500/10 p-4 pb-1">
                <p className="m-0">
                  <strong>
                    This is not a tested or supported configuration.
                  </strong>{" "}
                  We do not run migration tests against external services, so
                  your instance may break on the next upgrade with no migration
                  path provided. If you understand the risks — the variables are
                  below.
                </p>
              </div>

              <p>
                The only reason we use external services ourselves is the
                Databasus cloud — it runs on a cluster of distributed servers
                that together handle up to 100 Gbit/s of throughput, so all
                nodes need to share the same database.
                <br />
                <br />
                Why do we use a multi-node cluster for the cloud, but not
                recommend it to you even if you have hundreds of DBs? Our cloud
                is a public service used by thousands of users (because
                Databasus is the most popular PostgreSQL backup tool on GitHub
                now). Because it is public, we also face DDoS attacks and need
                far higher throughput than any typical company would. We also
                cannot predict or control how many databases our users connect
                or how many restores they run through it — some of them many
                terabytes in size. It&apos;s not just production use, it&apos;s
                permanent defence 🛡️. Your own instance is the opposite — you
                always know and control your own databases, so you never face
                that unpredictability.
                <br />
                <br />
                Usual production use of Databasus runs from a couple of
                databases to hundreds of databases (in DBA outsourcing
                companies). For that, a regular single-server installation with
                the internal PostgreSQL and Valkey is the right choice — it is
                what we use for backing up our own databases in{" "}
                <a href="/labs" className="text-blue-400 hover:text-blue-300">
                  Databasus Labs
                </a>{" "}
                too.
                <br />
                <br />
                If you genuinely face the same situation as we do, the variables
                are below — we do not lock this ability, even though it is hard
                to maintain — but pin your Databasus version first.
              </p>

              <p>
                <strong>External PostgreSQL</strong>
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>DANGEROUS_EXTERNAL_DATABASE_DSN</code>
                    </td>
                    <td data-label="Description">
                      Full PostgreSQL connection string. Example:{" "}
                      <code>
                        postgresql://user:password@host:5432/databasus
                      </code>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                <strong>External Valkey</strong>
              </p>

              <table>
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>DANGEROUS_VALKEY_HOST</code>
                    </td>
                    <td data-label="Description">
                      Hostname of your Valkey instance.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>DANGEROUS_VALKEY_PORT</code>
                    </td>
                    <td data-label="Description">
                      Port. Default <code>6379</code>.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>DANGEROUS_VALKEY_USERNAME</code>
                    </td>
                    <td data-label="Description">
                      Username. Leave empty if not set.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <code>DANGEROUS_VALKEY_PASSWORD</code>
                    </td>
                    <td data-label="Description">Password.</td>
                  </tr>
                  <tr>
                    <td>
                      <code>DANGEROUS_VALKEY_IS_SSL</code>
                    </td>
                    <td data-label="Description">
                      <code>true</code> or <code>false</code>.
                    </td>
                  </tr>
                </tbody>
              </table>

              <p>
                <strong>What if I need fully distributed, stateless HA?</strong>{" "}
                If your goal is a fully distributed, stateless HA setup where
                multiple application nodes share the same PostgreSQL and Valkey
                instances — neither Databasus, WAL-G nor pgBackRest are the
                right tools for that. Those are backup tools, not cluster
                orchestrators. For distributed PostgreSQL HA, look at
                purpose-built Kubernetes operators:
              </p>

              <ul>
                <li>
                  <strong>
                    <a
                      href="https://cloudnative-pg.io"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      CloudNativePG (CNPG)
                    </a>{" "}
                    + Barman Cloud
                  </strong>{" "}
                  — the CNCF-backed operator with built-in WAL archiving and
                  backup to object storage via Barman Cloud.
                </li>
                <li>
                  <strong>
                    <a
                      href="https://access.crunchydata.com/documentation/postgres-operator/latest/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PGO (Crunchy Postgres Operator)
                    </a>{" "}
                    + object storage
                  </strong>{" "}
                  — another mature operator with pgBackRest integration and
                  S3-compatible storage support.
                </li>
              </ul>
            </article>
          </div>
        </main>

        {/* Table of Contents */}
        <DocTableOfContentComponent />
      </div>
    </>
  );
}
