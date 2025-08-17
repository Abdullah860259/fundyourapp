import "./globals.css";
import { IsLoggedProvider } from "@/Context/IsloggedContext";
import LayoutWrapper from "@/Components/LayoutWrapper";
import Script from "next/script";

export const metadata = {
  title: "Abdullah - Portfolio & Projects",
  description:
    "Explore Abdullah's portfolio - a pre-engineering student passionate about web development, software engineering, and building impactful projects.",
  keywords: [
    "Abdullah Anwar",
    "Crowd Funding App",
    "Fund Your Project",
    "Portfolio",
    "Web Developer",
    "Software Engineer",
    "Next.js Projects",
    "Pakistan",
  ],
  authors: [{ name: "Abdullah Anwar" }],
  openGraph: {
    title: "Abdullah – Portfolio & Projects",
    description:
      "Explore Abdullah's portfolio showcasing web development skills, software projects, and engineering journey.",
    url: "http://localhost:3000",
    siteName: "Abdullah Portfolio",
    images: [
      {
        url: "http://localhost:3000/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdullah Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah – Portfolio & Projects",
    description:
      "Pre-engineering student & aspiring software engineer – explore my portfolio and projects.",
    images: ["http://localhost:3000/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-6HN3QHZXWN"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6HN3QHZXWN');
          `}
        </Script>

        <IsLoggedProvider>
          <LayoutWrapper>
            {children}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]" />
          </LayoutWrapper>
        </IsLoggedProvider>
      </body>
    </html>
  );
}
