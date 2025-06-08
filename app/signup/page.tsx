'use client'

import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

export default function page() {

    const router = useRouter()

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("signup success", response.data)
            router.push('/login')
        }
        catch (error: any){
            console.log("signup failed")
            toast.error("error while signing up")
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
        {
            setButtonDisabled(false)
        }
        else 
        {
            setButtonDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-black text-white">
            <h1 className="text-3xl font-bold mb-4">
                {loading ? "Processing..." : "Sign Up"}
            </h1>
            <hr className="w-full max-w-md border-gray-600 mb-6" />

            <div className="w-full max-w-md space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={() => onSignup()}
                    className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
                    disabled={buttonDisabled}
                >
                    Sign up
                </button>
                <br/>
                <br/>
            </div>
            <a href="/login" className='text-white'>Click here to visit Login page</a>
        </div>  
    )
}
