import type { Metadata } from "next";
import "./globals.css";
import NavigationState from "@/context/NavigationState";
import UserState from "@/context/UserState";
import LabState from "@/context/LabState";
import YardState from "@/context/YardState";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "KrushiSaathi",
  description:
    "KrushiSaathi is a revolutionary AI-driven agricultural solution designed to simplify and enhance the lives of small and marginal farmers in India."
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
      <body suppressHydrationWarning>
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
