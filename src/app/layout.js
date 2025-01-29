"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import {
  createTheme,
  Divider,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e90ff",
    },
    primary2: {
      main: "#64b5f6",
      light: alpha("#64b5f6", 0.5),
      dark: alpha("#64b5f6", 0.9),
      contrastText:
        getContrastRatio(alpha("#64b5f6", 0.7), "#fff") > 4.5 ? "#fff" : "#111",
    },
    secondary: {
      main: "#e53935",
    },
    secondary2: {
      main: "#ffa726",
      light: alpha("#ffa726", 0.5),
      dark: alpha("#ffa726", 0.9),
      contrastText:
        getContrastRatio(alpha("#ffa726", 0.7), "#fff") > 4.5 ? "#fff" : "#111",
    },
    neutral: {
      main: "#0e0e0e",
      light: alpha("#0e0e0e", 0.5),
      dark: alpha("#0e0e0e", 0.9),
      contrastText:
        getContrastRatio(alpha("#0e0e0e", 0.7), "#fff") > 4.5 ? "#fff" : "#111",
    },
    neutral2: {
      main: "#222222",
      light: alpha("#222222", 0.5),
      dark: alpha("#222222", 0.9),
      contrastText:
        getContrastRatio(alpha("#222222", 0.7), "#fff") > 4.5 ? "#fff" : "#111",
    },
    mode: "dark",
    contrastThreshold: 4.5,
    tonalOffset: 0.2,
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
      <Divider />
      <p className="mt-2">
        &copy; {new Date().getFullYear()} Kewl.com. All rights reserved.
      </p>
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
