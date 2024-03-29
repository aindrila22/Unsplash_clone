import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ProviderLayout from "./Provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Images Gallery",
  description: "unsplash clone Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="w-full">  
          <ProviderLayout> {children}</ProviderLayout>
      </body>
    </html>
  );
}
