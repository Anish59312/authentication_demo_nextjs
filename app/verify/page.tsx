'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

//TODO: error issue
//TODO: resend verify token
//TODO: use button click for verification

export default function VerifyEmailPage() {
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUser = async () => {
        try {
            await axios.post('/api/users/verify', { token })
            setIsVerified(true)
            setError(false)
        }
        catch (error: any) {
            setError(true)
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const url_token = window.location.search.split("=")[1]
        setToken(url_token || "")

        // const {query} = router
        // const urlTokenTwo = query.token
        // next js approach

    }, [])

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUser()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-black text-white">
            <h1 className='text-4xl'> Verify Email</h1>
            <h2 className='p2 bg-orange-500 text-black'>
                {token ? `${token}` : "no token"}
            </h2>
            {isVerified && (
                <div>
                    <h2>Verified</h2>
                    <link href='/login'>Login</link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className='text-red-500'>Error</h2>
                </div>
            ) }
        </div>
    )
}
