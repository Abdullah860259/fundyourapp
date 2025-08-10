"use client"
import React, { useEffect } from 'react'
import { useIsLogged } from '@/Context/IsloggedContext'
import { useSession } from 'next-auth/react'

const CheckLoginStatus = () => {
    const { isLogged, setIsLogged } = useIsLogged();
    const { status } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    }, [status]);
  return status === "authenticated" ? true : false
}


export default CheckLoginStatus