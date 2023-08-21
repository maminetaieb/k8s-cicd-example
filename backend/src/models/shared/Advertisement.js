import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../config/main'

const AdvertisementSchema = new mongoose.Schema({
  description: { type: String, required: true },
  link: { type: String },
  image: { type: String },
})

AdvertisementSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model(
  'Advertisement',
  AdvertisementSchema
)
