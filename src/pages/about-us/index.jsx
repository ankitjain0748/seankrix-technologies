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
import Layout from '@/Components/Layout';

export default function Index() {
  return (

    <Layout>

      <AboutHero />

      <Banner />
      <OurApproach />
      <Whoweare />
      <Partners />
      <FAQ />

    </Layout>

  );
}
