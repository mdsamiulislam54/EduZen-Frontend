import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/provider/queryClientProvider";
import { Toaster } from "sonner";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins", // optional (for CSS variable use)
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
      lang="en"
      className={`${poppins.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProvider>
          {children}
           <Toaster 
            position="top-right" 
            richColors
          />
        </QueryClientProvider>

      </body>
    </html>
  );
}
