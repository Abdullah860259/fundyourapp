
"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { SessionProvider } from "next-auth/react";

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();
    const hideLayout = ["/register"].includes(pathname);
    return (
        <>
            <SessionProvider>
                {!hideLayout && <Navbar />}
                {children}
                {!hideLayout && <Footer />}
            </SessionProvider>
        </>
    )
}

export default LayoutWrapper