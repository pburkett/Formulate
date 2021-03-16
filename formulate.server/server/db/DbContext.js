import mongoose from 'mongoose'
import PermissionSchema from '../models/Permission'
import AccountSchema from '../models/Account'
import FormulaSchema from '../models/Formula'

class DbContext {
  Permissions = mongoose.model('Permission', PermissionSchema);
  Account = mongoose.model('Account', AccountSchema);
  Formulas = mongoose.model('Formula', FormulaSchema)
};

export const dbContext = new DbContext()
