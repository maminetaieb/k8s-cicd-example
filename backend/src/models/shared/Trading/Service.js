import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../../config/main'

const serviceSchema = new mongoose.Schema({
  serviceName: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  deliveryType: { type: String, enum: ['local', 'distant'] },
  isFood: { type: Boolean, default: false },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
  percentage: { type: Number, default: 0 },
  partnersRegions: [
    {
      region: { type: mongoose.Schema.Types.ObjectId, ref: 'Region' },
      partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
  ],
  icon: { type: String, required: true },
})

export default config.db.shared.connection.model('Service', serviceSchema)
