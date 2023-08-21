import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../../config/main'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  mainImage: { type: String, required: true },
  secondaryImages: [{ type: String }],
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  date: { type: Date, required: true },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
  isActive: { type: Boolean, default: true },
  type: { type: String, enum: ['regular', 'food'], default: 'regular' },
  views: [{ type: Date }],
  feedback: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: { type: Number },
      comment: { type: String },
    },
  ],
  gender: { type: String, enum: ['men', 'women', 'kids'] },
  weight: { type: Number },
  pricing: [
    {
      variantOptions: [{ type: mongoose.Schema.Types.ObjectId }],
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
      isActive: { type: Boolean, default: true },
    },
  ],
})

productSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Product', productSchema)
