import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class RecipesService {
  async getOne(id) {
    const res = await dbContext.Recipes.findById(id)
    return res
  }

  async getAllPublic() {
    const res = await dbContext.Recipes.find({ public: true })
    return res
  }

  async getAllByProfile(userId, publicOnly) {
    const query = { creatorId: userId }
    if (publicOnly) {
      query.public = true
    }
    const res = await dbContext.Recipes.find(query)
    return res
  }

  async create(data) {
    const res = await dbContext.Recipes.create(data)
    return res
  }

  async edit(id, userId, data) {
    const res = await dbContext.Recipes.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async remove(id, userId) {
    const res = await dbContext.Recipes.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }
}
export const recipesService = new RecipesService()
