import type { Metadata } from "next";
import AppProvider from "src/shared/providers/AppProvider";
import { baseMetadata } from "src/shared/utils/metadata";
import "src/shared/styles/global.css";
import { Questrial } from "next/font/google";

const font = Questrial({
  subsets: ["latin"],
  display: "block",
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = baseMetadata;
