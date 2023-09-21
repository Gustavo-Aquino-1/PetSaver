'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import useAppContext from '../context/PetSaverContext'
import Image from 'next/image'

export default function Post() {
  const [breed, setBreed] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [cep, setCep] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const { user } = useAppContext()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      alert('You need be logged for create a post to your pet')
      router.push('/')
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log(user?.token)
    const response = await fetch('http://localhost:3000/api/pet', {
      method: 'POST',
      body: JSON.stringify({
        name,
        breed,
        lastLocation: { neighborhood, city, state, country },
        description,
        image,
      }),
      headers: {
        Authorization: user!.token || '',
      },
    })

    const data = await response.json()
    if (response.status != 201)
      return alert('Error while creating pet ' + data.message)

    alert('Your post was created sucessfully')

    router.push('/pet')
  }

  useEffect(() => {
    if (cep[cep.length - 1] && !'1234567890'.includes(cep[cep.length - 1])) {
      setCep(
        cep
          .split('')
          .slice(0, cep.length - 1)
          .join(''),
      )
    }
    if (cep.length == 8) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [cep])

  const getLocation = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    if (data.erro) return alert('INVALID CEP')
    setIsDisabled(true)
    setTimeout(() => {
      setIsDisabled(false)
    }, 5000)
    setNeighborhood(data.bairro)
    setCity(data.localidade)
    setState(data.uf)
    setCountry('Brazil')
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.includes('image')) {
      return alert('Please upload an image file')
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string
      setImage(result)
    }
  }

  return (
    <main className='flex justify-center w-full items-center'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-10 mt-20 w-full'
      >
        {image && (
          <Image
            src={image}
            height={500}
            width={500}
            alt='pet'
            className='m-auto'
          />
        )}

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Image</p>
          <input
            className='w-[40%]'
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            required
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Name</p>
          <input
            className='w-[40%]'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Breed</p>
          <input
            className='w-[40%]'
            type='text'
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={8}
            placeholder='Do a short description about your pet for help people find him!!'
            required
            className='w-[40%]'
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>CEP</p>
          <input
            className='w-[40%] flex gap-5'
            type='text'
            minLength={8}
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button
            className='bg-gradient-to-r from-sky-400 to-emerald-500 text-white disabled:opacity-40'
            type='button'
            onClick={getLocation}
            disabled={isDisabled}
          >
            get my location
          </button>
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Neighborhood</p>
          <input
            className='w-[40%]'
            type='text'
            minLength={2}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>City</p>
          <input
            className='w-[40%]'
            type='text'
            minLength={2}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>State</p>
          <input
            className='w-[40%]'
            type='text'
            minLength={2}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label className='text-center flex flex-col gap-5 justify-center items-center'>
          <p>Country</p>
          <input
            className='w-[40%]'
            type='text'
            minLength={2}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <br />
        <br />

        <button
          className='w-[20%] m-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white mb-10'
          type='submit'
        >
          create my pet alert
        </button>
      </form>
    </main>
  )
}
