import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { PiNotebookBold } from 'react-icons/pi'
import { FaDog } from 'react-icons/fa'
import { GrAlert } from 'react-icons/gr'
import Link from 'next/link'

function Header() {
  return (
    <div className='w-full flex justify-around bg-gradient-to-r from-sky-300 to-emerald-400 text-gray-700 text-2xl h-20 items-center justify-center'>
      <div className='flex gap-5'>
        <Link href='/pet'>Pets</Link>
        <FaDog />
      </div>

      <div className='flex gap-5'>
        <Link href='/profile'>My Profile</Link>
        <CgProfile />
      </div>

      <div className='flex gap-5'>
        <Link href='/about'>About</Link>
        <PiNotebookBold />
      </div>

      <div className='flex gap-5'>
        <Link href='/post'>Lost my Pet</Link>
        <GrAlert />
      </div>
    </div>
  )
}

export default Header
