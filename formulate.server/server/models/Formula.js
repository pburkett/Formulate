import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true }
})

const Formula = new Schema(
  {
    name: { type: String, required: true },
    ingredientList: [ItemSchema],
    flourList: [ItemSchema],
    public: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Formula
