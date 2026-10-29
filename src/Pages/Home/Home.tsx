import FullServices from '@/components/FullServices';
import Section1HOME from './Section1_HOME';
import Section2HOME from './Section2_HOME';
import Section3Home from './Section3_Home';
import Section4HOME from './Section4_HOME';
import Section5HOME from './Section5_HOME';
import Section6HOME from './Section6_HOME';
import Section7HOME from './Section7_HOME';

const Home = () => {
    return (
        <>
            <Section1HOME/>
            <Section2HOME/>
            <Section3Home/>
            <Section4HOME/>
            <Section5HOME/>
            <Section6HOME/>
            <Section7HOME/>
            <FullServices/>
        </>
    );
}

export default Home;
