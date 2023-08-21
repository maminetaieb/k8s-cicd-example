import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../config/main'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  photo: { type: String, default: null },
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }],
  workPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
  workTimes: [
    {
      partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
      from: { type: String },
      to: { type: String },
      holiday: { type: Boolean, default: false },
    },
  ],
  brakes: [
    {
      partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
      from: { type: String },
      to: { type: String },
    },
  ],
  joined: { type: Date },
  isPartner: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  isVendor: { type: Boolean, default: false },
  building: { door: { type: String }, floor: { type: String } },
  firstLogin: { type: Boolean, default: true },
  locationState: { type: Boolean, default: false },
  notificationToken: { type: String, default: '' },
  notifications: [
    {
      read: { type: Boolean, default: false },
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date },
      partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      isRated: { type: Boolean, default: false },
      content: { type: String, required: true },
    },
  ],
  // custom field
  isSuspended: { type: Boolean, default: false },
})

UserSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('User', UserSchema)
