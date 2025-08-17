import React from 'react'
import Image from 'next/image'

const Features = () => {
    return (
        <div className='bg-white [background:radial-gradient(ellipse_at_top_left,#ffffff_0%,#a88aff_40%,#63e_100%)]'>
            <h1 className="bg-white text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black pt-10 ">
                What We Offer
            </h1>

            <div className="flex flex-col bg-white md:flex-row justify-center items-center gap-8 p-6 sm:p-10 lg:p-20 flex-wrap">

                {/* Card 1 */}
                <div className="card w-full md:w-2/3 lg:max-w-2xl h-64 text-black card-side flex-col md:flex-row 
                        transition transform duration-300 hover:-translate-y-2 
                        hover:shadow-2xl hover:shadow-black rounded-2xl justify-center items-center">
                    <figure className="flex justify-center items-center w-[180px] h-full p-4">
                        <Image
                            src="https://static.vecteezy.com/system/resources/previews/013/212/810/non_2x/financial-insurance-money-icon-protection-guarantees-cash-secure-investment-vector.jpg"
                            alt="Secure Fundraising"
                            width={150}
                            height={150}
                            className="rounded-xl object-contain w-full h-full"
                        />
                    </figure>
                    <div className="card-body text-left flex-1 flex flex-col justify-center">
                        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-semibold">
                            Secure Fundraising
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            Launch campaigns with trust — safe payments, transparent goals, and full control.
                        </p>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="card w-full md:w-2/3 lg:max-w-2xl h-64 text-black card-side flex-col md:flex-row 
                        transition transform duration-300 hover:-translate-y-2 
                        hover:shadow-2xl hover:shadow-black rounded-2xl  justify-center items-center">
                    <figure className="flex justify-center items-center w-[180px] h-full p-4">
                        <Image
                            src="https://thumbs.dreamstime.com/b/global-location-icon-vector-flat-outline-trust-vision-culture-business-color-287435033.jpg"
                            alt="Global Reach"
                            width={150}
                            height={150}
                            className="rounded-xl object-contain w-full h-full"
                        />
                    </figure>
                    <div className="card-body text-left flex-1 flex flex-col justify-center">
                        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-semibold">
                            Global Reach
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            Share your story worldwide and connect with supporters across the globe.
                        </p>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="card w-full md:w-2/3 lg:max-w-2xl h-64 text-black card-side flex-col md:flex-row 
                        transition transform duration-300 hover:-translate-y-2 
                        hover:shadow-2xl hover:shadow-black rounded-2xl  justify-center items-center">
                    <figure className="flex justify-center items-center w-[180px] h-full p-4">
                        <Image
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80"
                            alt="Community Support"
                            width={150}
                            height={150}
                            className="rounded-xl object-contain w-full h-full"
                        />
                    </figure>
                    <div className="card-body text-left flex-1 flex flex-col justify-center">
                        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-semibold">
                            Community Support
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            Backed by people who believe in you — build momentum with every supporter.
                        </p>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="card w-full md:w-2/3 lg:max-w-2xl h-64 text-black card-side flex-col md:flex-row 
                        transition transform duration-300 hover:-translate-y-2 
                        hover:shadow-2xl hover:shadow-black rounded-2xl  justify-center items-center">
                    <figure className="flex justify-center items-center w-[180px] h-full p-4">
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1trZ84MyYI9xe3_Iqja8uAjGSJCCyYm1-8Q&s"
                            alt="Transparency & Trust"
                            width={150}
                            height={150}
                            className="object-contain w-full h-full rounded-4xl  "
                        />
                    </figure>
                    <div className="card-body text-left flex-1 flex flex-col justify-center">
                        <h2 className="card-title text-lg sm:text-xl md:text-2xl font-semibold">
                            Transparency & Trust
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg">
                            Every contribution is tracked clearly, ensuring accountability and trust.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Features
