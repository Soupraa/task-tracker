import { Geist, Geist_Mono, Jersey_10, Inter, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const jersey = Jersey_10({
  subsets: ["latin"],
  variable: "--font-jersey",
  display: "swap", // Helps with loading
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Helps with loading
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap", // Helps with loading
});
export const metadata = {
  title: "OnTrack",
  description: "OnTrack, stay on top of your tasks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jersey.variable} ${inter.variable} ${oswald.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
