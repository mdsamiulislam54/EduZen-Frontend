import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/provider/queryClientProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EduZen",
  description: "A powerful SaaS solution designed to streamline coaching center management, including students, batches, and payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning

    >
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-right"
            richColors
          />
          <QueryClientProvider>

            {children}

          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
