import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../config/main'

const deliveryOrderSchema = new mongoose.Schema({
  collectDeliverer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  clientDeliverer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isRatedDeliverer: { type: Boolean, default: false },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  collectDate: { type: Date },
  deliveryDate: { type: Date },
  inDeposit: { type: Boolean, default: false },
  delivered: { type: Boolean, default: false },
  deliveryStatus: {
    type: String,
    enum: [
      'settled',
      'during_client_delivery',
      'during_collect_delivery',
      'during_return_delivery',
    ],
    default: 'settled',
  },
  returned: { type: Boolean, default: false },
  payed: { type: Boolean, default: false },
  type: { type: String, enum: ['local', 'distant'] },
  deposit: { type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' },
  distance: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['to_be_picked_up', 'to_be_delivered', 'to_be_returned'],
    default: 'to_be_picked_up',
  },
})

deliveryOrderSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model(
  'DeliveryOrder',
  deliveryOrderSchema
)
