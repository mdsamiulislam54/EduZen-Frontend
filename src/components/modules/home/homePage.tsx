
import SubscriptionPage from '@/app/(commonLayout)/subscriptions/page'
import SubscriptionCard from '../Dashboard/Owner/Subscription/SubscriptionCard'
import DashboardPreview from './DashboardPreview'
import FeaturesSection from './Features'
import Hero from './Hero'
import HowToWorks from './HowToWorks'
import StatsSection from './Stats'
import Testimonials from './Testimonials'
import CTASection from './CTASection'
import AboutUsPage from './AboutUs'


const HomePage = () => {
    return (
        <div className='px-4 '>

            <Hero description='Empower your coaching center with a smart, all-in-one management solution designed to simplify daily operations' heading='Run Your Coaching Center Smarter, Not Harder' />
            <div className='py-16'>
                <StatsSection />
            </div>
            <div className='py-16'>
                <FeaturesSection />
            </div>
            <div className='py-16'>
                <DashboardPreview />
            </div>
            <div className='py-16'>
                <HowToWorks />
            </div>
            <div className='py-16'>
                <div>
                    <h2 className='text-xl md:text-5xl font-bold text-center mb-8'>Choose Your Plan</h2>
                    <p className='text-muted-foreground text-center mb-12'>Simple and transparent pricing. No hidden fees, cancel anytime.</p>
                </div>
                <SubscriptionPage />
            </div>
            <div className='py-16'>
                <Testimonials />
            </div>
            <div className='py-10'>
                <CTASection />
            </div>
            
        </div>
    )
}

export default HomePage