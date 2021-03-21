import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true }
})

const Recipe = new Schema(
  {
    creatorId: { type: String, required: true },
    name: { type: String, required: true },
    ingredientList: [ItemSchema],
    flourList: [ItemSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Recipe.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Recipe
