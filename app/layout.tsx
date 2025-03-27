import type { Metadata } from "next";
import "./globals.css";
import NavigationState from "@/context/NavigationState";
import UserState from "@/context/UserState";
import LabState from "@/context/LabState";
import YardState from "@/context/YardState"; // Import YardState
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Krushi Saathi",
  description:
    "Krushi Saathi is a platform for farmers to get information about farming with AI powerd suggestions.",
};

export default function RootLayout({
  children,
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
      <body>
        <UserState>
          <Toaster position="top-right" />
          <NavigationState>
            <YardState>
              <LabState>{children}</LabState>
            </YardState>
          </NavigationState>
        </UserState>
      </body>
    </html>
  );
}
