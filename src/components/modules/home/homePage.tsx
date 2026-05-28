
import Hero from './Hero'
import StatsSection from './Stats'


const HomePage = () => {
    return (
        <div className='px-4 '>

            <Hero description='Empower your coaching center with a smart, all-in-one management solution designed to simplify daily operations' heading='Run Your Coaching Center Smarter, Not Harder' />
            <div className='my-10'>
                <StatsSection />
            </div>
        </div>
    )
}

export default HomePage