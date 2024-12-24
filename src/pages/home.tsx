import Hero from '@/components/hero';
// import Feature from '@/components/feature';
import Footer from '@/components/footer';
import CTA from '@/components/cta';
// import Stat from '@/components/stat';
import Feature1 from '@/components/feature1';

const Home = () => {
  return (
    <div>
        <Hero />
        {/* <Feature /> */}
        <Feature1 />
        {/* <Stat /> */}
        <CTA />
        <Footer />
    </div>
    
  );
};

export default Home;