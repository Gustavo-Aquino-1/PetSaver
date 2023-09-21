'use client'

import { FormEvent, useState } from 'react'
import useAppContext from './context/PetSaverContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useAppContext()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (response.status != 200) return alert('user cannot be found')

    const user = await response.json()
    setUser(user)

    router.push('/pet')
  }

  return (
    <main className='h-screen h-full'>
      <form className='h-screen flex flex-col items-center justify-center gap-10 text-lg' onSubmit={handleSubmit}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          placeholder='Email'
        />

        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          min={8}
          required
          placeholder='Password'
        />

        <button className='bg-gray-300 bg-gradient-to-r from-sky-500 to-emerald-500 text-white pr-5 pl-5 border-none text-lg' type='submit'>sign in</button>
        <Link href="/signup">Create my account</Link>
      </form>
    </main>
  )
}
