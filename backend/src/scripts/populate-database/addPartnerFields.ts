//@ts-nocheck
import { Partner } from '../../models/shared'
import { Model, Document } from 'mongoose'

const getRandomDocument = async (model: Model<any>) => {
  const totalDocs = await model.countDocuments().exec()
  const random = Math.floor(Math.random() * totalDocs)

  const doc = await model.findOne().skip(random)
  return doc as Document
}

const addSales = async (count: number) => {
  const partner = await getRandomDocument(Partner)

  for (let i = 0; i < count; i++) {
    partner.itemsPurchased.push(
      new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 24)
      )
    )
  }

  await partner.save()
}
const addViews = async (count: number) => {
  const partner = await getRandomDocument(Partner)

  for (let i = 0; i < count; i++) {
    partner.views.push(
      new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 24)
      )
    )
  }

  await partner.save()
}

const addFields = async (count: number) => {
  for (let i = 0; i < count; i++) {
    try {
      await addSales(100)
      await addViews(100)
      await new Promise((res, rej) => setTimeout(res, 50))
      console.log(`added fields for partner ${i}.`)
    } catch (error: unknown) {
      console.error(error)
      break
    }
  }
}

const main = async () => {
  addFields(100)
}

main()
