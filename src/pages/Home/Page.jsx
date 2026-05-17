import React from 'react';
import Hero from './Hero';
import Navbar from '../../Components/Navbar';
import Banner from './Banner';
import AboutAgency from './AboutAgency';
import OurServices from './OurServices';
import JoinAgency from './JoinAgency';
import Expertise from './Expertise';
import Testimonials from './Testimonials';
import Footer from '../../Components/Footer';
import LetsCollaborate from '../../Components/LetsCollaborate';
import Whychosse from './Whychosse';
import FeaturesSection from './FeaturesSection'
import WhatsAppButton from '@/Components/WhatsAppButton';
import Layout from '@/Components/Layout';

function Page() {
    return (

        <Layout>

            <Hero />

            <Banner />
            <AboutAgency />
            <OurServices />
            <Whychosse />
            <FeaturesSection
            />
            <Expertise />
            <JoinAgency />
            {/* <Testimonials /> */}
            {/* <LetsCollaborate /> */}
        </Layout>




    );
}

export default Page;