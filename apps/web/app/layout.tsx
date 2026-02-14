import { Geist, Geist_Mono, Sora, Instrument_Serif } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/src/components/providers"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const instrumentalSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrumental-serif",
  display: "swap",
})

const sora = Sora({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${instrumentalSerif.variable} ${sora.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
