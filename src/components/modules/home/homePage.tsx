

import FeaturesSection from './Features'
import Hero from './Hero'
import HowToWorks from './HowToWorks'
import StatsSection from './Stats'
import Testimonials from './Testimonials'
import CTASection from './CTASection'



const HomePage = () => {
    return (
        <div className="container-c">
            {/* Hero */}
            <section className="pb-20">
                <Hero
                    
                />
            </section>

            {/* Stats */}
            <section className="py-20">
                <StatsSection />
            </section>

            {/* Features */}
            <section className="py-20">
                <FeaturesSection />
            </section>

            


            {/* How It Works */}
            <section className="py-20">
                <HowToWorks />
            </section>


            {/* Testimonials */}
            <section className="py-20">
                <Testimonials />
            </section>

            {/* CTA */}
            <section className="py-24">
                <CTASection />
            </section>
        </div>
    );
};

export default HomePage;
