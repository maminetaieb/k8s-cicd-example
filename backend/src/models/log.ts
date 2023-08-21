import { Document, Schema, SchemaType } from 'mongoose'
import { UserDocument } from './user'
import config from '../config/main'
import mongoosePaginate from 'mongoose-paginate-v2'

// Schema
const LogSchema = new Schema<LogDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
  },
  { timestamps: true }
)

export interface LogDocument extends Document {
  user: UserDocument
  action: string
  description: string
}

//@ts-ignore
LogSchema.plugin(mongoosePaginate)

export default config.db.local.connection.model<LogDocument>('Log', LogSchema)
