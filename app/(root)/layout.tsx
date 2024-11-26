import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Isaac's weather app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
