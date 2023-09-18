import { Schema } from 'mongoose'
import Abstract from './Abstract'

interface IComment {
  id?: string
  _id?: string
  petId: string
  userId: string
  text: string
}

export default class Comment extends Abstract<IComment> {
  constructor() {
    super(
      new Schema<IComment>({
        petId: { type: String, required: true },
        userId: { type: String, required: true },
        text: { type: String, required: true },
      }),
      'Comment',
    )
  }
}
