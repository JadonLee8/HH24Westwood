import React from "react";
import "./globals.css";

import Footer from "@/components/Footer";
import { GameProvider } from "@/components/context/GameContext";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
            </head>
            <body className="flex flex-col min-h-screen relative overflow-hidden">
                <GameProvider>
                    <div>{children}</div>
                </GameProvider>
                <Footer />
            </body>
        </html>
    );
}
