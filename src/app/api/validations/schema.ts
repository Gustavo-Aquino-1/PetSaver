import joi from 'joi'

const locationSchema = joi.object({
  neighborhood: joi.string().min(1).required(),
  city: joi.string().min(1).required(),
  state: joi.string().min(1).required(),
  country: joi.string().min(1).required(),
})

const userSchema = joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  location: locationSchema.required(),
})

const petSchema = joi.object({
  ownerId: joi.string().required(),
  name: joi.string().min(2).required(),
  breed: joi.string().min(2).required(),
  lastLocation: locationSchema.required(),
  description: joi.string().min(1).required(),
  image: joi.string().min(5).required(),
})

export { userSchema, petSchema }
