import express from 'express'
import { DomainsController } from '../controllers'

const DomainsRouter = express.Router()

/**
 * Get one domain
 */
DomainsRouter.get('/:id', DomainsController.getOne)

/**
 * Get all domains
 * You can filter results
 */
DomainsRouter.get('/', DomainsController.getAll)

/**
 * Cannot post domains
 */
DomainsRouter.post('/', (req, res) => {
  res.status(403).send('Operation not supported')
})

export { DomainsRouter }
