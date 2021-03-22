import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class PermissionsService {
  async verifyUse(itemId, userId, collectionName = 'item') {
    const query = { itemId: itemId }
    const res = await dbContext.Permissions.find(query)
    if (res.length === 0) {
      throw new BadRequest(`Permission not found, ${collectionName} cannot be accessed`)
    }
    return res[0].canUse.find(p => p.userId === userId) || res[0].canEdit.find(p => p.userId === userId) || res[0].canEditPerms.find(p => p.userId === userId)
  }

  async verifyEdit(itemId, userId, collectionName = 'item') {
    const query = { itemId: itemId }
    const res = await dbContext.Permissions.find(query)
    if (!res) {
      throw new BadRequest(`Permission not found, ${collectionName} cannot be accessed`)
    }
    return res[0].canEdit.find(p => p.userId === userId) || res[0].canEditPerms.find(p => p.userId === userId)
  }

  async verifyEditPerms(itemId, userId, collectionName = 'item') {
    const query = { itemId: itemId }
    const res = await dbContext.Permissions.find(query)
    if (!res) {
      throw new BadRequest(`Permission not found, ${collectionName} cannot be accessed`)
    }
    return res[0].canEditPerms.find(p => p.userId === userId)
  }

  async create(data) {
    const res = await dbContext.Permissions.create(data)
    if (!res) {
      throw new BadRequest('Not Enough Data')
    }
    return res
  }

  async edit(data, query) {
    const res = await dbContext.Permissions.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  async delete(query) {
    const res = await dbContext.Permissions.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return 'Deleted'
  }
}
export const permissionsService = new PermissionsService()
