import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const PartnerSchema = new mongoose.Schema({
  description: { type: String, default: 'Please add a description' },
  profileImage: { type: String },
  backgroundImage: { type: String },
  images: [{ type: String }],
  deliverers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      pseudoname: { type: String },
      type: { type: String, enum: ['collect', 'delivery', 'both'] },
      workingCities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
      duringDelivery: { type: Boolean, default: false },
      path: {
        currentPosition: { lng: { type: Number }, lat: { type: Number } },
        targetPosition: { lng: { type: Number }, lat: { type: Number } },
      },
    },
  ], //updated field
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  managers: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      notes: { type: String },
      pseudoname: { type: String },
      access: { type: mongoose.Schema.Types.ObjectId, ref: 'Access' },
    },
  ], //updated Field
  rating: { type: Number },
  services: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
  partnerName: { type: String },
  website: { type: String },
  instagram: { type: String },
  isDeliveryDistantPartner: { type: Boolean, default: false },
  isDeliveryLocalPartner: { type: Boolean, default: false },
  youtube: { type: String },
  facebook: { type: String },
  patentent: { type: String },
  returnRules: { type: String },
  workingDays: {
    from: { type: String },
    to: { type: String },
  },
  workingHours: {
    from: { type: String },
    to: { type: String },
  },
  email: { type: String },
  rules: { type: String },
  localisation: { lat: { type: Number }, lng: { type: Number } },
  delivery: {
    cities: [
      {
        city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
        deliveryPrice: { type: Number, default: 0 },
        deliveryTime: { from: { type: String }, to: { type: String } },
      },
    ],
    regions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }],
  },
  phone: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  views: [{ type: Date }],
  holiday: { type: Boolean, default: false },
  itemsPurchased: [{ type: Date }],
  socialReason: { type: String },
  questionOne: { type: String },
  joined: { type: Date },
  questionTwo: { type: String },
  percentage: { type: Number, required: true },
  confirmed: { type: Boolean, default: false },
  // custom field
  isSuspended: { type: Boolean, default: false },
})

PartnerSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Partner', PartnerSchema)
