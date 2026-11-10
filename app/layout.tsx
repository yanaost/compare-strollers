import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Providers } from "./providers";

export const metadata: Metadata = {
  // Resolves every relative `alternates.canonical` and any future absolute-URL
  // tag against the live origin. Without it Next emits canonicals verbatim,
  // i.e. relative — legal, but the one tag least worth leaving ambiguous.
  metadataBase: new URL("https://comparestrollers.com"),
  title: "Compare strollers side by side",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Kept as the original <link> rather than next/font: swapping to a
            generated family name is a styling change that needs browser
            verification, which this migration deliberately does not bundle in. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,600..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
