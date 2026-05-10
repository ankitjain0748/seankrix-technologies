// Home.jsx (The Final Solution)

import React from 'react';

import Navbar from '../../Components/Navbar';
import Banner from '../Home/Banner';

import Footer from '../../Components/Footer';
import ContactHero from './ContactHero';
import ContactInfo from './ContactInfo';
import LetsCollaborate from '../../Components/LetsCollaborate';
import WhatsAppButton from '@/Components/WhatsAppButton';


export default function Index() {
  return (

    <main className='bg-black'>


      <div className="">

        <div className='relative z-20'>
          <Navbar />
          <ContactHero />
        </div>

        <Banner />
        <ContactInfo />
        <Footer />
      </div>                    <WhatsAppButton />


    </main>
  );
}