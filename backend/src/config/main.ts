// import passport config
import dotenv from 'dotenv'
dotenv.config()
import { useConnection } from './mongoose'

const localURI = process.env.LOCAL_DB_URI || null
const sharedURI = process.env.SHARED_DB_URI || null

export default {
  env: (process.env.NODE_ENV || 'development') as 'development' | 'production',
  jwt: {
    secret: process.env.JWT_SECRET || 'JWT_SECRET',
    expiresIn: 60 * 5,
  },
  jwtRefresh: {
    secret: process.env.JWT_SECRET_REFRESH || 'JWT_SECRET_REFRESH',
    expiresIn: 60 * 60 * 24, // automatic logout every 24 hours
  },
  express: {
    port: process.env.PORT || 8000,
  },
  db: {
    local: {
      uri: localURI,
      connection: useConnection(localURI, 'local'),
    },
    shared: {
      uri: sharedURI,
      connection: useConnection(sharedURI, 'shared'),
    },
  },
}
