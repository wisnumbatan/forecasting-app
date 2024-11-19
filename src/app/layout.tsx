import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { cn } from "@/lib/utils"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: {
    default: "ForecastPro - Advanced Time Series Forecasting",
    template: "%s | ForecastPro"
  },
  description: "Professional time series forecasting and analytics platform",
  keywords: ["forecasting", "time series", "analytics", "machine learning"],
  authors: [{ name: "ForecastPro Team" }],
  creator: "ForecastPro",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
