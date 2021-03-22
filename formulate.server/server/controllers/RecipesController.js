import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { recipesService } from '../services/RecipesService'
import { permissionsService } from '../services/PermissionsService'
import { UnAuthorized } from '../utils/Errors'

export class RecipesController extends BaseController {
  constructor() {
    super('api/recipes')
    this.router
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getOne(req, res, next) {
    try {
      const data = await recipesService.getOne(req.params.id)
      if (!data.public) {
        req.userInfo = await Auth0Provider.getUserInfoFromBearerToken(req.headers.authorization)
      }
      if (data.public || await permissionsService.verifyUse(req.params.id, req.userInfo.id)) {
        res.send(data)
      } else { throw new UnAuthorized('You do not have permission to use this DoughShape') }
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const permissions = req.body.permissions || {}
      permissions.canUse ? permissions.canUse.push({ userId: req.userInfo.id }) : permissions.canUse = [{ userId: req.userInfo.id }]
      const data = await recipesService.create(req.body)
      await permissionsService.create({
        collectionName: 'Recipes',
        itemId: data._id,
        ...permissions
      })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
