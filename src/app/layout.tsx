import type { Metadata } from "next";
import { Poppins, Inter, Playfair } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/provider/queryClientProvider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";
import { getCurrentUser, JwtPayload } from "@/service/auth.service";
import { AuthProvider } from "@/provider/AuthProdiver";
import { IUser } from "@/types/user.type";
import { SweetAlertProvider } from "@/provider/SweetalertProvider";
import SmoothScroll from "@/provider/SmoothScroll";



const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EduZen",
  description: "A powerful SaaS solution designed to streamline coaching center management, including students, batches, and payments.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getCurrentUser() as IUser
  return (
    <html
      lang="en" suppressHydrationWarning

    >
      <body className={`${poppins.variable}${inter.variable}${playfair.variable}`}>

        <AuthProvider user={user}>
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
              <SweetAlertProvider>
                <SmoothScroll>
                  {children}
                </SmoothScroll>
              </SweetAlertProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
