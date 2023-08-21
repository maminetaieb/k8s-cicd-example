import express from 'express'
import config from './config/main'
import './config/passport'
import cors from 'cors'
import apicache from 'apicache'

import * as Routers from './routers'
import { checkAuth } from './middlewares'
import { errorHandler } from './utils/errors'

const app = express()
apicache.options({
  debug: config.env === 'development',
})

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.set('trust proxy', true)

app.on('error', console.error)

app.get('/time', (req, res) => {
  return res.status(200).json({
    'server-time': new Date().toISOString(),
  })
})

app.get('/', (req, res) => {
  return res
    .status(200)
    .send(`Accept: application/json;Server-Time: ${new Date().toISOString()}`)
})

// public routes for authentication
app.use('/auth', Routers.AuthRouter)

// private routes (must be authenticated to access)
app.use('/users', checkAuth(), Routers.UsersRouter)
app.use('/analytics', checkAuth(), Routers.AnalyticsRouter)
app.use('/partners', checkAuth(), Routers.PartnersRouter)
app.use('/feedback', checkAuth(), Routers.FeedbackRouter)
app.use('/domains', checkAuth(), Routers.DomainsRouter)
app.use('/orders', checkAuth(), Routers.OrdersRouter)
app.use('/delivery-orders', checkAuth(), Routers.DeliveryOrdersRouter)
app.use('/log', checkAuth(), Routers.LogRouter)
app.use('/advertisements', checkAuth(), Routers.AdvertisementsRouter)
app.use('/products', checkAuth(), Routers.ProductsRouter)
app.use('/locate', checkAuth(), Routers.LocateRouter)
app.use('/configuration', checkAuth(), Routers.ConfigsRouter)

app.use(errorHandler)

app.listen(config.express.port, () => {
  console.log(`server started on port ${config.express.port}`)
})
