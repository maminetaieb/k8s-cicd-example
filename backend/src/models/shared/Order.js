import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const orderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  actif: { type: Boolean, default: true }, //history delivery
  taked: { type: Boolean, default: false }, //taken by deliverer from partner
  prepared: { type: Boolean, default: false }, //prepared order by partner
  passed: { type: Boolean, default: false }, // passed order from client
  payed: { type: Boolean, default: false }, // deliverer payed order money to partner
  price: { type: Number, default: 0 },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  deliveryOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryOrder' },
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
  phone: { type: String },
  date: { type: Date },
  type: { type: String, enum: ['regular', 'food'], default: 'regular' },
  foodItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      ingredients: [{ type: mongoose.Schema.Types.ObjectId }],
    },
  ],
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      productPricing: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
})

orderSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Order', orderSchema)
