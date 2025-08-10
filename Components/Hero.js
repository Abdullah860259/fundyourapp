import Link from 'next/link'
import React, { use } from 'react'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import authOptions from '@/lib/auth'
const Hero = async () => {
    const session = await getServerSession(authOptions)
    const isLogged = !!session
    const href = isLogged ? "/dashboard" : "/login"

    return (
        <div className="hero text-[#111827] min-h-[calc(100dvh-4rem)]">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <h1 className="text-6xl">Empowering your vision,</h1>
                    <h1 className="text-6xl mt-5 text-transparent	bg-clip-text	 bg-gradient-to-r from-black via-gray-600 to-gray-400"> one fund at a time</h1>
                    <p className="py-6 text-xl">
                        Turn ideas into impact — raise funds, launch projects, and build the future.
                    </p>
                    <Link href={href}>
                        <button className="btn btn-primary ">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero