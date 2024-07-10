import { Inter } from "next/font/google";
import { Poppins } from 'next/font/google'
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose the weights you need
  variable: '--font-poppins', // Optional: for use with CSS variables
})

export const metadata = {
  title: "ezummarizer",
  description: "AI app that summarizes text for you",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
