import type { Metadata } from "next";
import { Inter, Roboto, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: 'swap', variable: '--font-inter' });
const roboto = Roboto({ 
  weight: ['400', '500', '700', '900'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-roboto'
});
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "My Professional Portfolio",
  description: "A showcase of my projects and work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`w-full h-full m-0 p-0 ${inter.variable} ${roboto.variable} ${poppins.variable}`}>
      <body className={`${roboto.className} text-black flex flex-col min-h-screen w-full m-0 p-0 overflow-x-hidden`}>
        <Navbar />
        <main className="flex-grow w-full m-0 p-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

