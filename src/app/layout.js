import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kewl.com",
};

function Footer() {
  return (
    <footer
      style={{ textAlign: "center", padding: "1rem" }}
      className="h-16 absolute bottom-0 w-full"
    >
      <p>&copy; {new Date().getFullYear()} Kewl.com. All rights reserved.</p>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <Navbar />
        <main className="pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
