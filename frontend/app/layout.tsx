import React from 'react'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'



export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body className="flex flex-col min-h-screen relative">
                <Header />
                <div className="px-2 py-5">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}