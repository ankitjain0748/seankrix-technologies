// Home.jsx (The Final Solution)

import React from 'react';

import Navbar from '../../Components/Navbar';
import Banner from '../Home/Banner';

import Footer from '../../Components/Footer';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import WhatsAppButton from '@/Components/WhatsAppButton';
import Layout from '@/Components/Layout';
import Head from 'next/head';


export default function Index() {
  return (

    <Layout>
      <Head>
        {/* Primary SEO */}
        <title>
          Contact Seankrix Technologies | Website, Mobile App & Software Development Company
        </title>

        <meta
          name="description"
          content="Contact Seankrix Technologies for Website Development, Mobile App Development, Custom Software Development, ERP, CRM, E-commerce Development, SEO and Digital Marketing services. Get a free consultation today."
        />

        <meta
          name="keywords"
          content="Contact Seankrix Technologies, Contact Website Development Company, Software Development Company India, Mobile App Development Company, ERP Development, CRM Development, SEO Company India, Digital Marketing Agency, Web Development Consultation, IT Company Jaipur"
        />

        <meta name="author" content="Seankrix Technologies" />
        <meta name="publisher" content="Seankrix Technologies" />

        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />

        <meta name="googlebot" content="index,follow" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <meta
          name="theme-color"
          content="#00BFFF"
        />

        <meta
          httpEquiv="content-language"
          content="en-IN"
        />

        <meta
          name="format-detection"
          content="telephone=no"
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href="https://www.seankrixtechnologies.com/contact"
        />

        <link
          rel="alternate"
          hrefLang="en-IN"
          href="https://www.seankrixtechnologies.com/contact"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Seankrix Technologies" />

        <meta
          property="og:title"
          content="Contact Seankrix Technologies | Web & Software Development Company"
        />

        <meta
          property="og:description"
          content="Get in touch with Seankrix Technologies for Website Development, Mobile App Development, ERP, CRM, SEO, Digital Marketing and Custom Software Development."
        />

        <meta
          property="og:url"
          content="https://www.seankrixtechnologies.com/contact"
        />

        <meta
          property="og:image"
          content="https://www.seankrixtechnologies.com/og-image.webp"
        />

        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Contact Seankrix Technologies"
        />

        <meta
          name="twitter:description"
          content="Let's discuss your Website, Mobile App, ERP, CRM, SEO or Software Development project."
        />

        <meta
          name="twitter:image"
          content="https://www.seankrixtechnologies.com/og-image.webp"
        />

        {/* Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://www.seankrixtechnologies.com/#organization",
              "name": "Seankrix Technologies",
              "url": "https://www.seankrixtechnologies.com",
              "logo": "https://www.seankrixtechnologies.com/logo.png",
              "email": "info@seankrixtechnologies.com",
              "telephone": "+91-8824744976"
            }),
          }}
        />

        {/* Contact Page Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Seankrix Technologies",
              "url": "https://www.seankrixtechnologies.com/contact",
              "description":
                "Contact Seankrix Technologies for Website Development, Mobile App Development, SEO, Digital Marketing and Software Development Services."
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Seankrix Technologies",
              "url": "https://www.seankrixtechnologies.com",
              "telephone": "+91-8824744976",
              "email": "info@seankrixtechnologies.com",
              "priceRange": "₹₹",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            }),
          }}
        />
      </Head>

      <ContactHero />
      <Banner />
      <ContactInfo />
    </Layout>


  );
}