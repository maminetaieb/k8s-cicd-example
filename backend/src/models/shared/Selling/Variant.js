import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../../config/main'

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  options: [
    {
      name: { type: String, required: true },
    },
  ],
})

export default config.db.shared.connection.model('Variant', variantSchema)
