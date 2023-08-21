import { Document, Schema } from 'mongoose'
import config from '../config/main'
import bcrypt from 'bcrypt'

// Schema
const UserSchema = new Schema<UserDocument>({
  displayName: {
    type: String,
    min: 3,
    max: 32,
  },
  profilePicture: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastActive: {
    type: Date,
    default: new Date(),
  },
  lastLogin: [{ type: Date }],
  tokens: [
    {
      token: String,
      ipAddress: String,
      lastActive: {
        type: Date,
        default: new Date(),
      },
    },
  ],
})

export interface UserDocument extends Document {
  displayName: string
  username: string
  password: string
  lastActive: Date
  // 2 elements array, always push and pop an element on login, last element is lastLogin
  lastLogin: Date[]
  tokens: {
    token: string
    ipAddress?: string
    lastActive: Date
  }[]
  validPassword: (password: string) => boolean
}

// Hash and save password when its modified
UserSchema.pre<UserDocument>('save', function (next) {
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  next()
})

UserSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password)
}

export default config.db.local.connection.model<UserDocument>(
  'User',
  UserSchema
)
