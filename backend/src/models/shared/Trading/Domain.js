import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../../config/main'

const domainSchema = new mongoose.Schema({
  name: {
    fr: { type: String, required: true },
    en: { type: String, required: true },
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  type: { type: String, enum: ['shopping', 'food', 'service'] },
  status: { type: Boolean, default: true },
})

domainSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Domain', domainSchema)
