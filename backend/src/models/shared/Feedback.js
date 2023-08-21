import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, min: 0, max: 5 },
  comment: { type: String },
  date: { type: Date },
  deliverer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
})

feedbackSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Feedback', feedbackSchema)
