

import FeaturesSection from './Features'
import Hero from './Hero'
import HowToWorks from './HowToWorks'
import StatsSection from './Stats'
import Testimonials from './Testimonials'
import CTASection from './CTASection'



const HomePage = () => {
    return (
        <div className="px-4">
            {/* Hero */}
            <section className="pb-20">
                <Hero
                    heading="Run Your Coaching Center Smarter, Not Harder"
                    description="Empower your coaching center with a smart, all-in-one management solution designed to simplify daily operations"
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
