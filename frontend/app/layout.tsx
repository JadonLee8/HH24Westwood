import React from 'react'
import './globals.css'

import Footer from '@/components/Footer'

export default function RootLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head />
            <body className="flex flex-col min-h-screen relative overflow-hidden">
                <div className="">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    )
}