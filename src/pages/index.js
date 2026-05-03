import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Page from "./Home/Page";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
 <>
    <Head>
  <title>Web Development Services | SEANKRIX Technologies</title>
  <meta name="description" content="Professional website development services for businesses. Fast, responsive and SEO-friendly solutions." />
</Head>
    <Page />
 </>
  );
}
