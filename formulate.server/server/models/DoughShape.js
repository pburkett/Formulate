import mongoose from 'mongoose'
const Schema = mongoose.Schema

const DoughShape = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    doughWeight: { type: Number, required: true },
    pan: { type: String },
    public: { type: Boolean, default: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default DoughShape
