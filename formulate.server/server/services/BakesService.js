import { dbContext } from '../db/DbContext'
import { recipesService } from './RecipesService'
import { permissionsService } from '../services/PermissionsService'
class BakesService {
  async create(data) {
    const out = {
      creatorId: data.creatorId,
      recipes: [],
      ingredientList: [],
      flourList: []
    }
    for (const ind in data.orders) {
      const item = data.orders[ind]
      item.creatorId = data.creatorId
      const recipe = await recipesService.create(item)
      out.recipes.push({ recipeId: recipe.id })

      for (const i in recipe.flourList) {
        const flour = recipe.flourList[i]
        const indexOfMatch = out.flourList.findIndex(f => f.name === flour.name)
        if (indexOfMatch !== -1) {
          out.flourList[indexOfMatch].weight += flour.weight
        } else {
          out.flourList.push(flour)
        }
      }

      for (const i in recipe.ingredientList) {
        const ingredient = recipe.ingredientList[i]
        const indexOfMatch = out.ingredientList.findIndex(i => i.name === ingredient.name)
        if (indexOfMatch !== -1) {
          out.ingredientList[indexOfMatch].weight += ingredient.weight
        } else {
          out.ingredientList.push(ingredient)
        }
      }

      const permissions = data.permissions || {}
      permissions.canUse ? permissions.canUse.push({ userId: data.creatorId }) : permissions.canUse = [{ userId: data.creatorId }]
      await permissionsService.create({
        collectionName: 'Recipes',
        itemId: recipe._id,
        ...permissions
      })
    }

    const res = await dbContext.Bakes.create(out)
    return res
  }
}

export const bakesService = new BakesService()
