import mongoose from 'mongoose'
// const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userId: { type: String, required: true }

})
const Permission = new Schema(
  {
    collectionName: { type: String, required: true },
    itemId: { type: String, required: true },
    public: { type: Boolean, default: false },
    canEditPerms: [UserSchema],
    canEdit: [UserSchema],
    canUse: [UserSchema]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Permission
