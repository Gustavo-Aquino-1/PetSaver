'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { FormEvent, useEffect, useState } from 'react'
import { MdLocationPin } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import useAppContext from '@/app/context/PetSaverContext'

function PetDetails() {
  const [pet, setPet] = useState<any>()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const { user } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    const getPet = async () => {
      const response = await fetch('http://localhost:3000/api/pet/' + id)
      if (response.status != 200)
        return alert('Error while get pet informations, try again later')

      const findPet = await response.json()
      console.log(findPet)
      setPet(findPet)
    }
    getPet()
  }, [])

  const handleComment = async (e: FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('You need be logged for create a comment')
      router.push('/')
      return
    }
    const response = await fetch('http://localhost:3000/api/comment/' + id, {
      method: 'POST',
      body: JSON.stringify({ text: comment }),
      headers: {
        Authorization: user!.token || '',
      },
    })

    const data = await response.json()

    if (response.status != 201) {
      alert('Some error hapeness while creating a comment - ' + data.message)
      return
    }

    setPet({ ...pet, comments: [...pet.comments, data] })
    setComment('')
  }

  return (
    <div>
      {pet && (
        <div className='flex justify-center gap-40 mt-20 h-screen h-full m-20'>
          <div className='flex flex-col gap-5'>
            <div className='self-center flex flex-col gap-5 border-2 border-zinc-300 rounded-t-md pb-4 max-w-[400px]'>
              <Image src={pet.image} height={300} width={400} alt={pet.name} />
              <p className='ml-5'>Name: {pet.name}</p>
              <p className='ml-5'>Breed: {pet.breed}</p>
              <p className='flex items-center gap-2 ml-5'>
                {pet.lastLocation.neighborhood}, {pet.lastLocation.city} -{' '}
                {pet.lastLocation.state} <MdLocationPin />
              </p>
              <p className='ml-5'> Description: {pet.description}</p>
            </div>

            <button className='self-center bg-gradient-to-r from-purple-500 to-pink-500 text-white' onClick={() => setIsFormVisible(!isFormVisible)}>
              comment
            </button>

            {isFormVisible && (
              <form className='self-center flex gap-3'>
                <input
                  type='text'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='write your comment here'
                  minLength={8}
                  min={8}
                  required
                />

                <button className='bg-blue-500 text-white' type='submit' onClick={handleComment}>
                  add comment
                </button>
              </form>
            )}
          </div>

          <div className=' flex flex-col gap-5 mt-5'>
            {pet.comments.map((e: any) => (
              <div key={e._id} className='max-w-[700px] text-lg'>
                <CgProfile size='18px' />
                <p className='ml-5'>{e.text}</p>
                <hr className='text-black' />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PetDetails
