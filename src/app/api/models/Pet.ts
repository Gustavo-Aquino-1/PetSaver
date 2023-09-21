import { Schema } from 'mongoose'
import Abstract from './Abstract'

export interface IPet {
  id?: string
  _id?: string
  ownerId: string
  name: string
  breed: string
  lastLocation: {
    neighborhood: string
    city: string
    state: string
    country: string
  }
  description: string
  image: string
}

export default class Pet extends Abstract<IPet> {
  constructor() {
    super(
      new Schema<IPet>({
        ownerId: { type: String, required: true },
        name: { type: String, required: true },
        breed: { type: String, required: true },
        lastLocation: {
          type: {
            neighborhood: String,
            city: String,
            state: String,
            country: String,
          },
          required: true,
        },
        description: { type: String, required: true },
        image: { type: String, required: true },
      }),
      'Pet',
    )
  }
}
