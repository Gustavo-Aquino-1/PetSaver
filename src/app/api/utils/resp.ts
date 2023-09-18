import { NextResponse } from 'next/server'

const resp = (s: number, m: unknown) => NextResponse.json(m, { status: s })

const respM = (s: number, m: unknown) =>
  NextResponse.json({ message: m }, { status: s })

export { resp, respM }
