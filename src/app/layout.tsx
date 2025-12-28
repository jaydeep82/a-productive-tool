import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/organisms/Navbar";

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
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-8 animate-in">
            {children}
          </div>
        </main>
        <footer className="py-8 border-t border-border mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Productive App. Built with precision.
          </div>
        </footer>
      </body>
    </html>
  );
}
