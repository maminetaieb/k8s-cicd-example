import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  VerifyCallback,
} from 'passport-jwt'
import { User, UserDocument } from '../models'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    (username, password, done) => {
      User.findOne({ username: username }, (err: Error, user: UserDocument) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false)
        }
        if (!user.validPassword(password)) {
          return done(null, false)
        }

        return done(null, user)
      })
    }
  )
)

interface LoginPayload {
  sub: string
}

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload: LoginPayload, done) => {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findById(payload.sub)
        .then((user) => {
          return done(null, user)
        })
        .catch((err) => {
          return done(err)
        })
    }
  )
)
