import express from 'express'
import { FeedbackController } from '../controllers'

const FeedbackRouter = express.Router()

/**
 * Get a feedback
 */
FeedbackRouter.get('/:id', FeedbackController.getOne)

/**
 * Get a feedback
 */
FeedbackRouter.delete('/:id', FeedbackController.deleteOne)

/**
 * Get all feedback
 * You can filter results
 */
FeedbackRouter.get('/', FeedbackController.getAll)

/**
 *  Can not add feedback.
 */
FeedbackRouter.post('/', (req, res) => {
  res.status(403).send('Operation Not supported')
})

export { FeedbackRouter }
