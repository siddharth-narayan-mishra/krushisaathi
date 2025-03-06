import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import NavigationState from "@/context/NavigationState";
import UserState from "@/context/UserState";
import LabState from "@/context/LabState";
import { Roboto } from "next/font/google";

const readex = Readex_Pro({ subsets: ["latin", "latin-ext"] });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "300", "500", "700", "900"],
  variable: "--font-Roboto"
});

export const metadata: Metadata = {
  title: "Krushi Saathi",
  description:
    "Krushi Saathi is a platform for farmers to get information about farming with AI powerd suggestions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://atlas.microsoft.com/sdk/javascript/mapcontrol/3/atlas.min.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${readex.className} ${roboto.variable}`}>
        <UserState>
          <NavigationState>
            <LabState>{children}</LabState>
          </NavigationState>
        </UserState>
      </body>
    </html>
  );
}
