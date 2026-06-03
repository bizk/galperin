import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  description: "AI-powered supplier product search.",
  title: "Galperin"
};

type RootLayoutProperties = {
  readonly children: ReactNode;
};

export default function RootLayout(properties: RootLayoutProperties): ReactNode {
  return (
    <html lang="en">
      <body>{properties.children}</body>
    </html>
  );
}
