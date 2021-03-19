import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true }
})

const Formula = new Schema(
  {
    creatorId: { type: String, required: true },
    name: { type: String, required: true },
    ingredientList: [ItemSchema],
    flourList: [ItemSchema],
    public: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Formula.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Formula
