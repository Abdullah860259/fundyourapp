import React from 'react'
import Image from 'next/image'

const Features = () => {
    return (
        <>
            <div className='bg-white [background:radial-gradient(ellipse at top left, #ffffff 0%, #a88aff 40%, #63e 100%)]'>
                <h1 className="text-center  text-6xl text-black pt-10" >What We Offer</h1>
                <div className=' flex  justify-center items-center w-full p-20'>
                    <div className="card  max-w-2xl text-black card-side transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black rounded-2xl">
                        <figure>
                            <Image
                                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                alt="Movie"
                                width={300}
                                height={300}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                        </div>
                    </div>
                </div>
                <div className=' flex  justify-center items-center w-full p-20'>
                    <div className="card  max-w-2xl text-black card-side transition transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black rounded-2xl ">
                        <figure>
                            <Image
                                src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                                alt="Movie"
                                width={300}
                                height={300}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">New movie is released!</h2>
                            <p>Click the button to watch on Jetflix app.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Features