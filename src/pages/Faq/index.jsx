import React from 'react'
import Navbar from '../../Components/Navbar';
import FaqHero from './FaqHero';
import Banner from '../Home/Banner';
import Footer from '../../Components/Footer';
import LetsCollaborate from '../../Components/LetsCollaborate';
import FaqSection from './FaqSection';
import WhatsAppButton from '@/Components/WhatsAppButton';
import Layout from '@/Components/Layout';
export default function Index() {
  return (


    <Layout>

      <Navbar />
      <FaqHero />


      <Banner />
      <FaqSection />
    </Layout>
  );
}
