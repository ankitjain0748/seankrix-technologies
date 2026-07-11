import React from 'react'
import Navbar from '../../Components/Navbar';
import AboutHero from './AboutHero';
import Banner from '../Home/Banner';
import Footer from '../../Components/Footer';
import OurApproach from './OurApproach';
import Whoweare from './Whoweare';
import Partners from './Partners';
import FAQ from './Faq';
import WhatsAppButton from '@/Components/WhatsAppButton';
import Head from 'next/head';
import Layout from '@/Components/Layout';
import Leadership from './Leadership';

export default function Index() {
  return (

    <Layout>
      <Head>
        {/* Basic SEO */}
        <title>
          About Seankrix Technologies | Web Development & Software Company in India
        </title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00BFFF" />
        <meta name="format-detection" content="telephone=no" />

        {/* Primary SEO */}
        <meta
          name="description"
          content="Learn about Seankrix Technologies, a trusted web development, mobile app development, custom software, eCommerce, ERP, CRM, UI/UX, SEO, and digital solutions company in India. Meet our experienced leadership team and discover how we help businesses grow digitally."
        />

        <meta
          name="keywords"
          content="About Seankrix Technologies, Seankrix Technologies India, Web Development Company, Software Development Company, Mobile App Development, MERN Stack Development, React JS Development, Next.js Development, Node.js Development, Custom Software Development, CRM Development, ERP Development, eCommerce Development, SEO Company India, Digital Marketing Company, UI UX Design, Website Development Jaipur"
        />

        <meta name="author" content="Seankrix Technologies" />
        <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />

        <link
          rel="canonical"
          href="https://www.seankrixtechnologies.com/about-us"
        />

        {/* Language */}
        <meta httpEquiv="content-language" content="en-IN" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="Seankrix Technologies" />
        <meta
          property="og:title"
          content="About Seankrix Technologies | Leading Web & Software Development Company"
        />
        <meta
          property="og:description"
          content="Meet the team behind Seankrix Technologies. We build websites, mobile apps, CRM, ERP, eCommerce solutions, and scalable software for startups and enterprises."
        />
        <meta
          property="og:url"
          content="https://www.seankrixtechnologies.com/about-us"
        />
        <meta
          property="og:image"
          content="https://www.seankrixtechnologies.com/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Seankrix Technologies" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Seankrix Technologies | Digital Innovation Partner"
        />
        <meta
          name="twitter:description"
          content="Discover our experienced team, expertise, mission, and innovative software development solutions."
        />
        <meta
          name="twitter:image"
          content="https://www.seankrixtechnologies.com/og-image.jpg"
        />

        {/* Additional SEO */}
        <meta name="application-name" content="Seankrix Technologies" />
        <meta name="apple-mobile-web-app-title" content="Seankrix Technologies" />
        <meta name="creator" content="Seankrix Technologies" />
        <meta name="publisher" content="Seankrix Technologies" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.seankrixtechnologies.com/#organization",
                  name: "Seankrix Technologies",
                  url: "https://www.seankrixtechnologies.com",
                  logo: "https://www.seankrixtechnologies.com/logo.png",
                  image: "https://www.seankrixtechnologies.com/og-image.jpg",
                  description:
                    "Seankrix Technologies provides Web Development, Mobile App Development, CRM, ERP, SEO, Digital Marketing, UI/UX Design and Custom Software Solutions.",
                  foundingDate: "2024",
                  email: "info@seankrixtechnologies.com",
                  telephone: "+91-8824744976"
                },
                {
                  "@type": "AboutPage",
                  "@id":
                    "https://www.seankrixtechnologies.com/about-us/#webpage",
                  url: "https://www.seankrixtechnologies.com/about-us",
                  name: "About Seankrix Technologies",
                  isPartOf: {
                    "@id":
                      "https://www.seankrixtechnologies.com/#organization"
                  },
                  description:
                    "Learn about Seankrix Technologies, our founders, mission, vision and software development expertise."
                }
              ]
            }),
          }}
        />
      </Head>
      <section className="bg-black text-white py-20 px-4 sm:px-8">
        <AboutHero />


        <Banner />
        <OurApproach />
        <Whoweare />
        <Leadership />

        <Partners />
        <FAQ />

      </section>

    </Layout>
  );
}
