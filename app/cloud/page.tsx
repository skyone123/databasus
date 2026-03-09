import type { Metadata } from "next";
import { PriceCalculatorComponent } from "../components/PriceCalculatorComponent";

export const metadata: Metadata = {
  title: "Databasus Cloud",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://databasus.com/cloud",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function Index() {
  return (
    <div className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Databasus",
            description:
              "Free and open source tool for PostgreSQL scheduled backups (with MySQL and MongoDB support). Save them locally and to clouds. Notifications to Slack, Discord, Telegram, email, webhook, etc.",
            url: "https://databasus.com",
            image: "https://databasus.com/images/index/dashboard.png",
            logo: "https://databasus.com/logo.svg",
            publisher: {
              "@type": "Organization",
              name: "Databasus",
              logo: {
                "@type": "ImageObject",
                url: "https://databasus.com/logo.svg",
              },
            },
            featureList: [
              "Scheduled PostgreSQL backups",
              "Multiple storage destinations (S3, Google Drive, Dropbox, SFTP, rclone, etc.)",
              "Real-time notifications (Slack, Telegram, Discord, Webhook, email, etc.)",
              "Database health monitoring",
              "Self-hosted via Docker",
              "Open source and free",
              "Support for PostgreSQL 12-18",
              "Backup compression and AES-256-GCM encryption",
              "Support for PostgreSQL, MySQL, MariaDB and MongoDB",
              "Retention policies: time period, count, GFS and size limits",
            ],
            screenshot: "https://databasus.com/images/index/dashboard.png",
            softwareVersion: "latest",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Databasus",
            url: "https://databasus.com/",
            alternateName: ["databasus", "Databasus"],
            logo: "https://databasus.com/logo.svg",
            sameAs: ["https://github.com/databasus/databasus"],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Databasus",
            alternateName: ["databasus", "Databasus"],
            url: "https://databasus.com/",
            description: "PostgreSQL backup tool",
            publisher: { "@type": "Organization", name: "Databasus" },
          }),
        }}
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-5 px-4 md:px-0">
        <div className="mx-auto w-full max-w-[1000px] 2xl:max-w-[1200px]">
          <nav className="relative flex items-center justify-between border backdrop-blur-md bg-[#0C0E13]/80 md:bg-[#0C0E13]/20 border-[#ffffff20] px-3 py-2 rounded-xl">
            <a href="/" className="flex items-center gap-2.5">
              <img
                src="/logo.svg"
                alt="Databasus logo"
                width={32}
                height={32}
                className="h-7 w-7 md:h-8 md:w-8"
                fetchPriority="high"
                loading="eager"
              />

              <span className="text-base md:text-lg font-semibold pl-1">
                Databasus
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-3">
              <a
                href="/#how-to-use"
                target="_blank"
                className="py-2 hover:text-gray-300 transition-colors"
              >
                How to use
              </a>

              <a
                href="/#features"
                target="_blank"
                className="py-2 hover:text-gray-300 transition-colors"
              >
                Features
              </a>

              <a
                href="/installation"
                className="py-2 hover:text-gray-300 transition-colors"
              >
                Docs
              </a>

              <a
                href="#pricing"
                className="py-2 hover:text-gray-300 transition-colors"
              >
                Pricing
              </a>

              <a
                href="https://t.me/databasus_community"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 hover:text-gray-300 transition-colors"
              >
                Community
              </a>
            </div>

            <a
              href="https://github.com/databasus/databasus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 rounded-lg px-2 md:px-3 py-2 text-[14px] border border-[#0d6efd] bg-[#0d6efd] transition-colors"
            >
              Dashboard
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN SECTION */}
      <main className="relative overflow-hidden pt-[60px] md:pt-[68px]">
        <div className="relative mx-auto w-full max-w-[1000px] 2xl:max-w-[1200px] px-4 md:px-6 lg:px-0 pt-12 md:pt-[100px] pb-12 md:pb-[100px]">
          {/* Background ellipse */}
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4 w-[400px] h-[400px] md:w-[900px] md:h-[900px] bg-[#155dfc]/4 top-0 rounded-full blur-3xl -z-10" />
          </div>

          {/* Content */}
          <div className="text-center mb-8 md:mb-16">
            <div className="inline-flex items-center justify-center px-3 md:px-4 py-1 md:py-1.5 rounded-lg border border-[#ffffff20] mb-4 md:mb-6">
              <span className="text-sm font-medium">Cloud</span>
            </div>

            <h1 className="text-2xl sm:text-4xl sm:max-w-[300px] md:text-4xl leading-tight font-bold mb-4 md:mb-6 mx-auto md:max-w-[600px]">
              Databasus Cloud
            </h1>

            <p className="text-sm sm:text-lg text-gray-200 max-w-[550px] mx-auto mb-6 md:mb-10 px-2">
              Cloud for PostgreSQL, MySQL\MariaDB and MongoDB backup tool. We
              care about uptime, availability and security of your backups, so
              you can focus on your work and sleep well at night
            </p>

            <div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-2 sm:gap-2 max-w-[400px] mx-auto pb-0 sm:pb-[50px] lg:pb-0 lg:[0px]">
                <a
                  href="#installation"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-12 sm:py-2.5 bg-[#0d6efd] rounded-lg text-white font-medium hover:opacity-70 transition-opacity order-1"
                >
                  <span>Dashboard</span>
                  <svg
                    aria-hidden={true}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>

                <a
                  href="#pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 sm:px-12 sm:py-2.5 rounded-lg font-medium border border-[#ffffff20] bg-white text-black hover:opacity-70 transition-opacity order-2"
                >
                  <span>Pricing</span>
                </a>

                <a
                  href="https://app.databasus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:max-w-[356px] inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-white rounded-lg text-black font-medium hover:opacity-70 transition-opacity order-3"
                >
                  Go back to self-hosted
                </a>

                <img
                  src="/images/cloud/arrow.svg"
                  className="absolute hidden sm:block mt-[200px] ml-[-210px] sm:mt-[161px] sm:ml-[-260px] rotate-30 lg:ml-[435px] lg:mt-[70px] lg:rotate-0"
                  alt="Arrow"
                />

                <div className="text-sm sm:ml-[75px] sm:mt-[180px] max-w-[250px] sm:text-left sm:absolute lg:ml-[690px] lg:mt-[5px] text-gray-200 order-4 sm:order-0">
                  You can always switch back to self-hosted, no vendor lock-in
                  to the cloud
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Screenshot */}
          <div className="relative mx-auto max-w-[1200px]">
            <div>
              <img
                src="/images/index/dashboard.svg"
                alt="Databasus dashboard interface"
                width={980}
                height={620}
                className="w-full h-auto"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </main>

      {/* FEATURES OVERVIEW SECTION */}
      <section id="features" className="pb-12 md:pb-20 px-4 md:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1000px] 2xl:max-w-[1200px]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center px-3 md:px-4 py-1 md:py-1.5 rounded-lg border border-[#ffffff20] mb-4 md:mb-6">
              <span className="text-sm font-medium">Pricing</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Price calculator
            </h2>

            <p className="text-sm sm:text-lg text-gray-200 max-w-[650px] mx-auto mb-8 md:mb-10">
              The price is depended on the space you can use to store backups.
              We are really trying to provide affortable price for both small
              and large DBs. Usually it is cheaper than maintaining your own
              Databasus instance manually (with server, storage, monitoring,
              reservation, spending time, etc.)
            </p>
          </div>

          <PriceCalculatorComponent />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-12 border-t border-[#ffffff20] px-4 md:px-6 lg:px-0">
        <div className="mx-auto w-full max-w-[1000px] 2xl:max-w-[1200px]">
          <div className="flex flex-col items-center">
            <a href="/" className="flex items-center gap-2.5 mb-6">
              <img
                src="/logo.svg"
                alt="Databasus logo"
                width={32}
                height={32}
                className="h-7 w-7 md:h-8 md:w-8"
              />

              <span className="text-base md:text-lg font-semibold">
                Databasus
              </span>
            </a>

            <div className="flex flex-col gap-3 mb-4 text-sm md:text-base">
              {/* First row - Database backup links */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <a href="/" className="hover:text-gray-200 transition-colors">
                  PostgreSQL backup
                </a>
                <a
                  href="/mysql-backup"
                  className="hover:text-gray-200 transition-colors"
                >
                  MySQL and MariaDB backup
                </a>
                <a
                  href="/mongodb-backup"
                  className="hover:text-gray-200 transition-colors"
                >
                  MongoDB backup
                </a>
              </div>

              {/* Second row - General links */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <a
                  href="/installation"
                  className="hover:text-gray-200 transition-colors"
                >
                  Documentation
                </a>
                <a
                  href="/privacy"
                  className="hover:text-gray-200 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="https://github.com/databasus/databasus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://t.me/databasus_community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors"
                >
                  Community
                </a>
                <a
                  href="https://rostislav-dugin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200 transition-colors"
                >
                  Developer
                </a>
              </div>
            </div>

            <a
              href="mailto:info@databasus.com"
              className="hover:text-gray-200 transition-colors text-sm md:text-base mb-4"
            >
              info@databasus.com
            </a>

            <p className="text-gray-400 text-sm md:text-base text-center">
              © 2025 Databasus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
