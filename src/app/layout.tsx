import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar AI",
  description: "Futuristic AI Landing Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                three:
                  "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js/+esm",
                "three/addons/":
                  "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/",
                talkinghead:
                  "https://cdn.jsdelivr.net/gh/met4citizen/TalkingHead@1.5/modules/talkinghead.mjs",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
