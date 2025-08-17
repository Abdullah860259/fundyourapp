import Link from 'next/link'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'

const Hero = async () => {
    const session = await getServerSession(authOptions)
    const isLogged = !!session
    const href = isLogged ? "/dashboard" : "/login"

    return (
        <div className="hero text-[#111827] min-h-[calc(100dvh-4rem)] px-4">
            <div className="hero-content text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                        Empowering your vision,
                    </h1>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-4
                         text-transparent bg-clip-text bg-gradient-to-r 
                         from-black via-gray-600 to-gray-400">
                        one fund at a time
                    </h1>
                    <p className="py-6 text-base sm:text-lg md:text-xl">
                        Turn ideas into impact — raise funds, launch projects, and build the future.
                    </p>
                    <Link href={href}>
                        <button className="btn btn-primary px-6 py-3 text-base sm:text-lg">
                            Get Started
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero
