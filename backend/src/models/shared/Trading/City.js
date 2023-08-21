import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../../config/main'

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  regions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Region' }],
})

export default config.db.shared.connection.model('City', citySchema)
