import { Model, model, models, Schema } from "mongoose";

export default abstract class Abstract<T> {
  private model: Model<T>
  private schema: Schema<T>

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema
    this.model = models[modelName] || model(modelName, this.schema)
  }

  async find(partial: Partial<T> = {}) {
    return await this.model.find(partial)
  }

  async findOne(partial: Partial<T> = {}) {
    return await this.model.findOne(partial)
  }

  async findById(id: string) {
    return await this.model.findById(id)
  }

  async create(data: T) {
    return await this.model.create(data)
  }

  async updateById(id: string, data: Partial<T>) {
    return await this.model.findByIdAndUpdate(id, data)
  }

  async deleteById(id: string) {
    return await this.model.findByIdAndRemove(id)
  }
}