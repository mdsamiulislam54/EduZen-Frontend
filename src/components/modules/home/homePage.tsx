

import FeaturesSection from './Features'
import Hero from './Hero'
import HowToWorks from './HowToWorks'
import StatsSection from './Stats'
import Testimonials from './Testimonials'
import CTASection from './CTASection'



const HomePage = () => {
    return (
        <div className="">
            {/* Hero */}
            <section className="md:pb-20 ">
                <Hero
                    
                />
            </section>

            {/* Stats */}
            <section className="py-16">
                <StatsSection />
            </section>

            {/* Features */}
            <section className="py-16">
                <FeaturesSection />
            </section>

            


            {/* How It Works */}
            <section className="py-16">
                <HowToWorks />
            </section>


            {/* Testimonials */}
            <section className="py-16">
                <Testimonials />
            </section>

            {/* CTA */}
            <section className="py-16">
                <CTASection />
            </section>
        </div>
    );
};

export default HomePage;
