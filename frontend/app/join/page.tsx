'use client'
import React, { useState } from 'react';
import Socket from '@/components/network/Socket';

export default function Join() {
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div>
                    <h1>Enter Join Code</h1>
                    <input type="text" placeholder="Join Code" className="outline outline-2 outline-black p-2"/>
                    <button className="btn btn-primary m-3 py-2 px-4 bg-blue-500 rounded-md">Join</button>
                </div>
            </div>
        </>
    );``
}