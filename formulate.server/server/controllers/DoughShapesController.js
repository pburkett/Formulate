import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { doughShapesService } from '../services/DoughShapesService'
import { permissionsService } from '../services/PermissionsService'
import { UnAuthorized } from '../utils/Errors'

export class DoughShapesController extends BaseController {
  constructor() {
    super('api/doughshapes')
    this.router
      .get('/public', this.getAllPublic)
      .get('/:id', this.getOne)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getOne(req, res, next) {
    try {
      const data = await doughShapesService.getOne(req.params.id)
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

  async getAllPublic(req, res, next) {
    try {
      const data = await doughShapesService.getAllPublic()
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const permissions = req.body.permissions || {}
      permissions.canEditPerms ? permissions.canEditPerms.push({ userId: req.userInfo.id }) : permissions.canEditPerms = [{ userId: req.userInfo.id }]
      const data = await doughShapesService.create(req.body)
      await permissionsService.create({
        collectionName: 'DoughShapes',
        itemId: data._id,
        ...permissions
      })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      if (await permissionsService.verifyEdit(req.params.id, req.userInfo.id)) {
        const data = await doughShapesService.edit(req.params.id, req.userInfo.id, req.body)
        res.send(data)
      } else { throw new UnAuthorized('You do not have permission to edit this DoughShape') }
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      if (await permissionsService.verifyEditPerms(req.params.id, req.userInfo.id)) {
        const data = await doughShapesService.remove(req.params.id, req.userInfo.id)
        res.send(data)
      } else { throw new UnAuthorized('You do not have permission to delete this DoughShape') }
    } catch (error) {
      next(error)
    }
  }
}
