'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function LogoutPage () {
    const router = useRouter()
    const [data, setData] = useState("")
    
    const getUserDetails = async () => {
        const response = await axios.post('/api/users/aboutme')
        console.log(response)
        setData(response.data.data._id)
    }

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push('/login')
        }
        catch(error: any){
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-4 bg-black text-white'>
        <h1>Profile Page</h1>
        <hr/>
        <h2>{data === '' ? "not found" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button className='px-2 py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold' onClick={logout}>Logout</button>
            <button className='px-2 py-2 mt-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold' onClick={getUserDetails}>Get User Details</button>
        <hr/>

      </div>
    )
}

