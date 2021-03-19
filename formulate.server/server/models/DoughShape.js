import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DoughShape = new Schema(
  {
    creatorId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    doughWeight: { type: Number, required: true },
    pan: { type: String },
    public: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
DoughShape.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default DoughShape
