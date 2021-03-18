import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class DoughShapesService {
  async getOne(id) {
    const res = await dbContext.DoughShapes.findById(id)
    return res
  }

  async getAllPublic() {
    const res = await dbContext.DoughShapes.find({ public: true })
    return res
  }

  async create(data) {
    const res = await dbContext.DoughShapes.create(data)
    return res
  }

  async edit(id, userId, data) {
    const res = await dbContext.DoughShapes.findByIdAndUpdate(id, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async remove(id, userId) {
    const res = await dbContext.DoughShapes.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }
}
export const doughShapesService = new DoughShapesService()
