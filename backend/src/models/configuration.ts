import { Document, Schema, Model } from 'mongoose'
import config from '../config/main'

const ConfigurationSchema = new Schema<
  ConfigurationDocument,
  ConfigurationModel
>({
  instagramId: { type: String, default: null },
  facebookId: { type: String, default: null },
  youtubeId: { type: String, default: null },
  instgramKey: { type: String, default: null },
  facebookKey: { type: String, default: null },
  googleKey: { type: String, default: null },
})

export interface ConfigurationDocument extends Document {
  instagramId: string
  facebookId: string
  youtubeId: string
  instagramKey: string
  facebookKey: string
  googleKey: string
}

interface ConfigurationModel extends Model<ConfigurationDocument> {
  getSingleton: () => Promise<ConfigurationDocument>
}

ConfigurationSchema.statics.getSingleton = async function () {
  const configuration = await this.findOne()
    .sort({ updated: -1 })
    .limit(1)
    .exec()
  if (configuration === null) {
    const newConfiguration = await this.create({})
    return newConfiguration
  }
  return configuration
}

export default config.db.local.connection.model<
  ConfigurationDocument,
  ConfigurationModel
>('Configuration', ConfigurationSchema)
