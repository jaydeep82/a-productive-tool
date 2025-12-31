import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";
import { ThemeProvider } from "@/lib/ThemeProvider";
import Meta from '@/components/atoms/Meta';
import { PerformanceMonitor } from "@/components/utilities/PerformanceMonitor"; // Import the monitoring utility

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productive - Your Autonomous Assistant",
  description: "A premium productivity tool built for high-performance engineers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Meta />
        {/* 
          Accessibility Improvement: Skip to Content link.
          This allows keyboard users to bypass repetitive navigation elements (like the Navbar).
          Uses the sr-only pattern to hide it visually, only appearing on focus.
        */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only focus:p-3 focus:text-primary focus:bg-white 
            focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:shadow-lg focus:outline-none 
            focus:border focus:border-primary rounded transition-all duration-100 ease-out
          "
        >
          Skip to main content
        </a>

        {/* Performance Monitoring Utility: Runs side-effects only */}
        <PerformanceMonitor />

        <ThemeProvider>
          <Navbar />
          {/* Main content area, linked by the Skip to Content link */}
          <main id="main-content" className="flex-1">
            <div className="container mx-auto px-4 py-8 animate-in">
              {children}
            </div>
          </main>
          {/* Added role="contentinfo" for explicit semantic landmark definition */}
          <footer className="py-8 border-t border-border mt-auto" role="contentinfo">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Productive App. Built with precision.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
