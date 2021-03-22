import mongoose from 'mongoose'
import PermissionSchema from '../models/Permission'
import AccountSchema from '../models/Account'
import DoughShapeSchema from '../models/DoughShape'
import FormulaSchema from '../models/Formula'
import ProfileSchema from '../models/Profile'
import RecipeSchema from '../models/Recipe'
import BakeSchema from '../models/Bake'

class DbContext {
  Permissions = mongoose.model('Permission', PermissionSchema);
  Account = mongoose.model('Account', AccountSchema);
  DoughShapes = mongoose.model('DoughShape', DoughShapeSchema)
  Formulas = mongoose.model('Formula', FormulaSchema)
  Profiles = mongoose.model('Profile', ProfileSchema)
  Recipes = mongoose.model('Recipe', RecipeSchema)
  Bakes = mongoose.model('Bake', BakeSchema)
};

export const dbContext = new DbContext()
