'use client'
import React from 'react'

export default function ProfilePage({params} : any) {

  return (
      <div className='flex flex-col items-center justify-center min-h-screen py-4 bg-black text-white'>
          <h2 className='p-3 bg-green-500 rounded text-black'>{params.id}</h2>
    </div>
  )
}

