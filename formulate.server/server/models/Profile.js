import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Profile = new Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    email: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Profile
