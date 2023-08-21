import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const locationSchema = new mongoose.Schema({
  locationCode: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
})

export default config.db.shared.connection.model('Location', locationSchema)
