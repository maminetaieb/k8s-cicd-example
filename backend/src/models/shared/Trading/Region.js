import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../../config/main'

const RegionSchema = new mongoose.Schema({
  regionName: { type: String, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
})

export default config.db.shared.connection.model('Region', RegionSchema)
