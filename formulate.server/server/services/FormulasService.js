import { dbContext } from '../db/DbContext'
import { BadRequest, NotAcceptable } from '../utils/Errors'

class FormulasService {
  async getOne(id) {
    const res = await dbContext.Formulas.findById(id)
    return res
  }

  async getAllPublic() {
    const res = await dbContext.Formulas.find({ public: true })
    return res
  }

  async create(data) {
    if (this._checkFlourTotals(data.flourList)) {
      const res = await dbContext.Formulas.create(data)
      return res
    } else { throw new NotAcceptable('Sum of flour percentages must be 100') }
  }

  async edit(id, userId, data) {
    // NOTE When editing the flourList, the client must send all flours to be considered valid!!!
    if (!data.flourList || this._checkFlourTotals(data.flourList)) {
      const res = await dbContext.Formulas.findByIdAndUpdate(id, data, { new: true })
      if (!res) {
        throw new BadRequest('Invalid Id')
      }
      return res
    } else { throw new NotAcceptable('Sum of flour percentages must be 100') }
  }

  async remove(id, userId) {
    const res = await dbContext.Formulas.findByIdAndDelete(id)
    if (!res) {
      throw new BadRequest('Invalid Id')
    }
    return res
  }

  _checkFlourTotals(flourList) {
    let total = 0
    for (const ind in flourList) {
      total += flourList[ind].percentage
    }
    return total === 100
  }
}
export const formulasService = new FormulasService()
