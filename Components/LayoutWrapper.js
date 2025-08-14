
"use client"
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import Footer from "@/Components/Footer";
import Navbar from "@/Components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from 'sonner';

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();
    const hideLayout = ["/register"].includes(pathname);
    return (
        <>
            <SessionProvider>
                <Toaster
                    position="top-center"
                    richColors
                    closeButton={true}
                    duration={4000}  // milliseconds, default is 5000
                    toastOptions={{
                        success: {
                            style: { background: '#22c55e', color: '#fff' },
                            icon: '✅',
                        },
                        error: {
                            style: { background: '#ef4444', color: '#fff' },
                            icon: '❌',
                        },
                    }}
                />
                {!hideLayout && <Navbar />}
                {children}
                {!hideLayout && <Footer />}
            </SessionProvider>
        </>
    )
}

export default LayoutWrapper