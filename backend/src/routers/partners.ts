import express from 'express'
import { PartnersController } from '../controllers'

const PartnersRouter = express.Router()

/**
 * Read a partner using their ID
 */
PartnersRouter.get('/:id', PartnersController.getOne)

// partner specific routes
PartnersRouter.post('/:id/suspend', PartnersController.suspend)

PartnersRouter.get('/:id/sales', PartnersController.getPartnerSales)
PartnersRouter.get('/:id/views', PartnersController.getPartnerViews)

/**
 * Get all Partners
 * You can filter results
 */
PartnersRouter.get('/', PartnersController.getAll)

export { PartnersRouter }
