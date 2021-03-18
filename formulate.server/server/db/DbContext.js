import mongoose from 'mongoose'
import PermissionSchema from '../models/Permission'
import AccountSchema from '../models/Account'
import DoughShapeSchema from '../models/DoughShape'
import FormulaSchema from '../models/Formula'

class DbContext {
  Permissions = mongoose.model('Permission', PermissionSchema);
  Account = mongoose.model('Account', AccountSchema);
  DoughShapes = mongoose.model('DoughShape', DoughShapeSchema)
  Formulas = mongoose.model('Formula', FormulaSchema)
};

export const dbContext = new DbContext()
