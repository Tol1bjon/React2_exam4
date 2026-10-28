import FullServices from '@/components/FullServices';
import React from 'react';
import Section1HOME from './Section1_HOME';
import Section5HOME from './Section5_HOME';

const Home = () => {
    return (
        <>
            <Section1HOME/>
            <Section5HOME/>
            <FullServices/>
        </>
    );
}

export default Home;
