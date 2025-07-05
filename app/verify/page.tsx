'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function VerifyEmailPage() {
    const router = useRouter()
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const verifyUser = async () => {
        if (!token) return

        try {
            setLoading(true)
            setError(false)
            setErrorMessage("")

            const response = await axios.post('/api/users/verify', { token }, {
                timeout: 10000
            })

            setIsVerified(true)
            toast.success("Email verified successfully!")
            console.log("Verification success:", response.data)

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/login')
            }, 2000)

        } catch (error: any) {
            setError(true)
            setIsVerified(false)

            const message = error.response?.data?.error || error.message || "Verification failed"
            setErrorMessage(message)
            toast.error(message)
            console.log("Verification error:", error.response?.data || error)
        } finally {
            setLoading(false)
        }
    }

    const resendVerification = async () => {
        try {
            setLoading(true)
            await axios.post('/api/users/resend-verification', { token }, {
                timeout: 10000
            })
            toast.success("Verification email resent!")
        } catch (error: any) {
            const message = error.response?.data?.error || "Failed to resend verification"
            toast.error(message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUser()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-black text-white">
            <div className="w-full max-w-md text-center space-y-6">
                <h1 className='text-4xl font-bold mb-8'>Verify Email</h1>

                {/* Token Display */}
                <div className="p-3 bg-gray-800 rounded border">
                    <p className="text-sm text-gray-400 mb-1">Token:</p>
                    <p className={`text-sm font-mono break-all ${token ? 'text-orange-400' : 'text-red-400'}`}>
                        {token || "No token found"}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="p-4 bg-blue-900 rounded border border-blue-600">
                        <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-blue-200">Verifying...</p>
                    </div>
                )}

                {/* Success State */}
                {isVerified && !loading && (
                    <div className="p-4 bg-green-900 rounded border border-green-600">
                        <div className="text-green-400 text-3xl mb-2">✓</div>
                        <h2 className="text-xl font-semibold text-green-200 mb-2">Email Verified!</h2>
                        <p className="text-green-300 text-sm mb-3">Your email has been successfully verified.</p>
                        <p className="text-green-400 text-xs">Redirecting to login page...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="p-4 bg-red-900 rounded border border-red-600">
                        <div className="text-red-400 text-3xl mb-2">✗</div>
                        <h2 className="text-xl font-semibold text-red-200 mb-2">Verification Failed</h2>
                        <p className="text-red-300 text-sm mb-4">{errorMessage}</p>

                        <div className="space-y-2">
                            <button
                                onClick={verifyUser}
                                disabled={loading || !token}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-white text-sm font-medium"
                            >
                                Try Again
                            </button>

                            <button
                                onClick={resendVerification}
                                disabled={loading}
                                className="w-full py-2 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 rounded text-white text-sm font-medium"
                            >
                                Resend Verification Email
                            </button>
                        </div>
                    </div>
                )}

                {/* No Token State */}
                {!token && !loading && (
                    <div className="p-4 bg-yellow-900 rounded border border-yellow-600">
                        <div className="text-yellow-400 text-3xl mb-2">⚠</div>
                        <h2 className="text-xl font-semibold text-yellow-200 mb-2">No Verification Token</h2>
                        <p className="text-yellow-300 text-sm mb-4">Please check your email for the verification link.</p>

                        <button
                            onClick={() => router.push('/login')}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium"
                        >
                            Go to Login
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <div className="pt-4 border-t border-gray-700">
                    <button
                        onClick={() => router.push('/login')}
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    )
}