import { dbContext } from '../db/DbContext'
import { BadRequest, UnAuthorized } from '../utils/Errors'
import { doughShapesService } from './DoughShapesService'
import { formulasService } from './FormulasService'
import { permissionsService } from './PermissionsService'

class RecipesService {
  async _generateTotalDoughWeight(orderArray, userId) {
    let out = 0
    for (const ind in orderArray) {
      const item = orderArray[ind]
      if (await permissionsService.verifyUse(item.doughShape, userId)) {
        const shape = await doughShapesService.getOne(item.doughShape)
        out += shape.doughWeight * item.quantity
      } else {
        throw new UnAuthorized(`You are not authorized to use Doughshape with ID ${item.doughShape}`)
      }
    }
    return out
  }

  async _generateWeights(totalDoughWeight, formulaId, userId) {
    if (await permissionsService.verifyUse(formulaId, userId)) {
      const formula = await formulasService.getOne(formulaId)
      const recipe = { ingredientList: [], flourList: [] }
      let totalIngredientPercentage = 100

      for (const ind in formula.ingredientList) {
        const elem = formula.ingredientList[ind]
        totalIngredientPercentage += elem.percentage
      }
      const totalFlourWeight = totalDoughWeight / totalIngredientPercentage * 100

      for (const ind in formula.flourList) {
        const elem = formula.flourList[ind]
        const itemToInsert = { name: elem.name }
        itemToInsert.weight = (totalFlourWeight * elem.percentage / 100).toFixed(1)
        recipe.flourList.push(itemToInsert)
      }
      for (const ind in formula.ingredientList) {
        const elem = formula.ingredientList[ind]
        const itemToInsert = { name: elem.name }
        itemToInsert.weight = (totalFlourWeight * elem.percentage / 100).toFixed(1)
        recipe.ingredientList.push(itemToInsert)
      }

      return recipe
    }
  }

  async getOne(id) {
    const res = await dbContext.Recipes.findById(id)
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
    const out = {
      formulaId: data.formula,
      creatorId: data.creatorId
    }
    const totalWeight = await this._generateTotalDoughWeight(data.orderArray, data.creatorId)
    out.totalWeight = totalWeight
    const allWeights = await this._generateWeights(totalWeight, data.formula, data.creatorId)
    out.ingredientList = allWeights.ingredientList
    out.flourList = allWeights.flourList
    const res = await dbContext.Recipes.create(out)
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
