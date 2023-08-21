import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

import config from '../../config/main'

const conversationSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  date: { type: Date },
  title: { type: String },
  image: { type: String },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  type: { type: String, default: 'personal', enum: ['personal', 'group'] },
})

export default config.db.shared.connection.model(
  'Conversation',
  conversationSchema
)
