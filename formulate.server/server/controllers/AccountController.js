import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { doughShapesService } from '../services/DoughShapesService'
import { permissionsService } from '../services/PermissionsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('api/accounts')
    this.router
      .get('/:id', this.getProfile)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/doughshapes', this.getDoughShapes)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getProfile(req, res, next) {
    try {
      const profile = await accountService.findProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getDoughShapes(req, res, next) {
    try {
      const publicOnly = req.userInfo.id !== req.params.id
      const data = await doughShapesService.getAllByProfile(req.params.id, publicOnly)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}
