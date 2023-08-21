//@ts-nocheck
import { Feedback, User, Partner } from '../../models/shared'
import { Model, Document } from 'mongoose'
import axios from 'axios'

const getRandomDocument = async (model: Model<any>) => {
  const totalDocs = await model.countDocuments().exec()
  const random = Math.floor(Math.random() * totalDocs)

  const doc = await model.findOne().skip(random)
  return doc as Document
}

const getFeedbackText = (score: number) => {
  if (score < 2)
    return 'Very bad product, it took too long! I will never order from this partner again! I hate it!'
  if (score < 3)
    return 'Bad product, it took some time to arrive, I am not happy.'
  if (score < 4)
    return 'Took too long, but the service was good, I am not too mad.'
  return 'Amazing service, amazing product, I love it!'
}

const createFeedback = async () => {
  const partner = await getRandomDocument(Partner)
  const user = await getRandomDocument(User)
  const deliverer = await getRandomDocument(User)

  const invalidDocuments =
    user._id === deliverer._id ||
    partner.owner === user._id ||
    partner.owner === deliverer._id

  if (invalidDocuments) return false

  const score = Math.floor(Math.random() * 8) / 2 + 1
  const comment = getFeedbackText(score)

  const feedback = new Feedback({
    user,
    score,
    comment,
    date: new Date(
      new Date().getTime() -
        Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 90)
    ),
    deliverer,
    partner,
  })

  await feedback.save()

  user.feedbacks.push(feedback)
  await user.save()

  return true
}

const createFeedbacks = async (count: number) => {
  for (let i = 0; i < count; i++) {
    try {
      const added = await createFeedback()
      await new Promise((res, rej) => setTimeout(res, 50))
      if (added) console.log(`created feedback ${i}.`)
      else console.log('failed creating feedback')
    } catch (error: unknown) {
      console.error(error)
      break
    }
  }
}

const main = async () => {
  createFeedbacks(300)
}

main()
