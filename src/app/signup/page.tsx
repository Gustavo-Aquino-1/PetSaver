'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [cep, setCep] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        name,
        location: { neighborhood, city, state, country },
      }),
    })

    const data = await response.json()
    if (response.status != 201)
      return alert('Error while creating user ' + data.message)

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

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </label>

        <label>
          <p>Email</p>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <p>Password</p>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            min={8}
            required
          />
        </label>

        <label>
          <p>CEP</p>
          <input
            type='text'
            minLength={8}
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button type='button' onClick={getLocation} disabled={isDisabled}>
            get my location
          </button>
        </label>

        <label>
          <p>Neighborhood</p>
          <input
            type='text'
            minLength={2}
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
          />
        </label>

        <label>
          <p>City</p>
          <input
            type='text'
            minLength={2}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <label>
          <p>State</p>
          <input
            type='text'
            minLength={2}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          <p>Country</p>
          <input
            type='text'
            minLength={2}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>

        <br />
        <br />

        <button type='submit'>create my post</button>
      </form>
    </main>
  )
}
