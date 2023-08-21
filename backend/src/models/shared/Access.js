import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../config/main'

const accessSchema = new mongoose.Schema({
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  access: {
    dashboard: { type: Boolean, default: false },
    settings: { type: Boolean, default: false },
    statistics: { type: Boolean, default: false },
    deliverers: { type: Boolean, default: false },
    orders: {
      toBePickedUp: { type: Boolean, default: false },
      toBeDelivered: { type: Boolean, default: false },
      toBeReturned: { type: Boolean, default: false },
      history: { type: Boolean, default: false },
    },
    deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' }],
  },
})

export default config.db.shared.connection.model('Access', accessSchema)
