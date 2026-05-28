
import FeaturesSection from './Features'
import Hero from './Hero'
import StatsSection from './Stats'


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
        </div>
    )
}

export default HomePage