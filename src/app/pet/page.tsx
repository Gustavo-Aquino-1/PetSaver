'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import { useRouter } from 'next/navigation'

function Pet() {
  const [pets, setPets] = useState([])
  const router = useRouter()

  useEffect(() => {
    const get = async () => {
      const response = await fetch('http://localhost:3000/api/pet')
      const data = await response.json()
      setPets(data)
    }
    get()
  }, [])

  return (
    <div className='mt-20'>
      <div className='grid grid-cols-3 gap-10 w-full m-auto'>
        {pets.map((e: any) => (
          <div
            key={e._id}
            className='cursor-pointer m-auto flex flex-col items-center justify-center border bg-zinc-100 text-black text-lg flex flex-col gap-3 capitalize p-5 rounded'
            onClick={() => router.push('/pet/' + e._id)}
          >
            <Image
              src={e.image}
              height={300}
              width={300}
              alt={e.name}
              className='rounded'
            />
            <p>
              {e.name} ({e.breed})
            </p>
            <p className='flex items-center gap-2 font-bold'>
              {e.lastLocation.neighborhood}, {e.lastLocation.city} -{' '}
              {e.lastLocation.state} <MdLocationPin />
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pet
