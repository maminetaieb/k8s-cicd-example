import passport from 'passport'
import express from 'express'

export const checkAuth = () => passport.authenticate('jwt', { session: false })
