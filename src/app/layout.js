"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ff6b35",
    },
    neutral: {
      main: "#222222",
    },
  },
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <head>
          <title>Kewl.com</title>
          <link
            rel="icon"
            type="image/x-icon"
            href="./favicon.ico"
            sizes="any"
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
        >
          <ThemeProvider theme={theme}>
            <Navbar />
            <main className="pb-16">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
