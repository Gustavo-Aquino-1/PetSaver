'use client'

import React from 'react'
import useAppContext from '../context/PetSaverContext'
import { MdLocationPin } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function Profile() {
  const { user, setUser } = useAppContext()
  const router = useRouter()

  const logout = () => {
    setUser({})
    router.push('/')
  }

  return Object.keys(user || {}).length ? (
    <div className='flex flex-col gap-5 text-2xl m-10 items-start'>
      <p>Name: {user!.name}</p>
      <p>Email: {user!.email}</p>
      <p className='flex items-center gap-2 font-bold'>
        {user!.location.neighborhood}, {user!.location.city} -{' '}
        {user!.location.state} <MdLocationPin />
      </p>

      <button
        onClick={logout}
        className='bg-gradient-to-r from-sky-500 to-indigo-500 text-white'
      >
        logout
      </button>
    </div>
  ) : (
    <div className='text-2xl text-center mt-10'>
      <p>Do login to see your profile</p>
      <Link href='/' className='text-blue-400 underline'>
        Login
      </Link>
    </div>
  )
}

export default Profile
