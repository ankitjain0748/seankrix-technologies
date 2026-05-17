// Home.jsx (The Final Solution)

import React from 'react';

import Navbar from '../../Components/Navbar';
import Banner from '../Home/Banner';

import Footer from '../../Components/Footer';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import WhatsAppButton from '@/Components/WhatsAppButton';
import Layout from '@/Components/Layout';


export default function Index() {
  return (

    <Layout>

      <ContactHero />
      <Banner />
      <ContactInfo />
    </Layout>


  );
}