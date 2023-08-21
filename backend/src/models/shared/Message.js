import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../config/main'

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
  content: { type: String },
  code: { type: String },
  seen: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      seenDate: { type: Date },
    },
  ],
  date: { type: Date },
})

messageSchema.plugin(mongoosePaginate)

export default config.db.shared.connection.model('Message', messageSchema)
