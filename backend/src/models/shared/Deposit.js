import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const depositSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deliveryOrders: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryOrder' },
  ],
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  localisation: {
    lng: { type: Number },
    lat: { type: Number },
  },
  managers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

export default config.db.shared.connection.model('Deposit', depositSchema)
