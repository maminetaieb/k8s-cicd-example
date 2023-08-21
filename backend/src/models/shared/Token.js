import mongoose from 'mongoose'
import config from '../../config/main'

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

export default config.db.shared.connection.model('Token', tokenSchema)
