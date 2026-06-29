import React from "react";
import Head from "next/head";

import Hero from "./Hero";
import Banner from "./Banner";
import AboutAgency from "./AboutAgency";
import OurServices from "./OurServices";
import JoinAgency from "./JoinAgency";
import Expertise from "./Expertise";
import Whychosse from "./Whychosse";
import FeaturesSection from "./FeaturesSection";

import Layout from "@/Components/Layout";

function Page() {
  return (
    <>
      <Head>
        <title>
          Website Development Company in India | Seankrix Technologies - Web, Mobile App & Software Development
        </title>

        <meta
          name="description"
          content="Seankrix Technologies is a leading Website Development Company in India providing Custom Website Development, Mobile App Development, eCommerce Solutions, CRM, ERP, SEO, Digital Marketing, UI/UX Design and Software Development services."
        />

        <meta
          name="keywords"
          content="
Website Development Company India,
Website Development Company,
Best Web Development Company,
Custom Website Development,
Website Design Company,
Business Website Development,
Professional Website Development,
Responsive Website Design,
React JS Development,
Next.js Development,
Node.js Development,
Laravel Development,
MERN Stack Development,
Mobile App Development,
Android App Development,
iOS App Development,
Flutter App Development,
CRM Development,
ERP Development,
Software Development Company,
Custom Software Development,
SEO Company India,
Digital Marketing Company,
UI UX Design,
Ecommerce Website Development,
Website Maintenance,
Cloud Solutions,
API Development,
Seankrix Technologies
"
        />

        <meta name="author" content="Seankrix Technologies" />
        <meta name="publisher" content="Seankrix Technologies" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />        <meta name="googlebot" content="index, follow" />


        <link
          rel="canonical"
          href="https://www.seankrixtechnologies.com/"
        />

        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.country" content="India" />
        {/* Open Graph */}
        <meta property="og:locale" content="en_IN" />

        <meta property="og:type" content="website" />

        <meta property="og:site_name" content="Seankrix Technologies" />

        <meta
          property="og:title"
          content="Website Development Company in India | Seankrix Technologies"
        />

        <meta
          property="og:description"
          content="Professional Website Development, Mobile Apps, CRM, ERP, SEO & Software Development Services."
        />

        <meta
          property="og:image"
          content="https://www.seankrixtechnologies.com/og-image.webp"
        />

        <meta
          property="og:image:width"
          content="1200"
        />

        <meta
          property="og:image:height"
          content="630"
        />

        <meta
          property="og:url"
          content="https://www.seankrixtechnologies.com"
        />
        <link
          rel="canonical"
          href="https://www.seankrixtechnologies.com/"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Website Development Company in India | Seankrix Technologies"
        />

        <meta
          name="twitter:description"
          content="Professional Website Development, Mobile App Development, SEO & Software Solutions."
        />

        <meta
          name="twitter:image"
          content="https://www.seankrixtechnologies.com/og-image.webp"
        />

        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <link rel="manifest" href="/manifest.json" />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="dns-prefetch"
          href="//fonts.googleapis.com"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({

              "@context": "https://schema.org",

              "@type": "Organization",

              "name": "Seankrix Technologies",

              "url": "https://www.seankrixtechnologies.com",

              "logo": "https://www.seankrixtechnologies.com/logo.png",

              "email": "info@seankrixtechnologies.com",

              "telephone": "+91-8824744976",


            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({

              "@context": "https://schema.org",

              "@type": "ProfessionalService",

              "name": "Seankrix Technologies",

              "url": "https://www.seankrixtechnologies.com",

              "telephone": "+91-8824744976",

              "priceRange": "₹₹",

              "email": "info@seankrixtechnologies.com"

            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({

              "@context": "https://schema.org",

              "@type": "WebSite",

              "url": "https://www.seankrixtechnologies.com",

              "name": "Seankrix Technologies"

            })
          }}
        />
        {/* Mobile SEO */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#00BFFF"
        />

        <meta
          name="format-detection"
          content="telephone=no"
        />

        <meta charSet="UTF-8" />
      </Head>

      <Layout>
        <Hero />

        <Banner />

        <AboutAgency />

        <OurServices />

        <Whychosse />

        <FeaturesSection />

        <Expertise />

        <JoinAgency />
      </Layout>
    </>
  );
}

export default Page;