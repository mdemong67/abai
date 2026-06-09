import "./globals.css";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";

export const metadata = {
  title: "ABAI – All Bangladeshi Association of Ireland",
  description:
    "Official community website for the All Bangladeshi Association of Ireland — events, membership, elections, and diaspora support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <SiteProvider>{children}</SiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
