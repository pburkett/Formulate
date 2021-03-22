import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true }
})
const RecipeSchema = new Schema({
  recipeId: { type: String, required: true }
})

const Bake = new Schema(
  {
    creatorId: { type: String, required: true },
    recipes: [RecipeSchema],
    ingredientList: [ItemSchema],
    flourList: [ItemSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Bake.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Bake
