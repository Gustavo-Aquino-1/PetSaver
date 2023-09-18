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

export { userSchema }
