// @ts-nocheck
import mongoose from 'mongoose'
import Product from './Product'
import SubCategory from './SubCategory'
import Variant from './Variant'

import mongoosePaginate from 'mongoose-paginate-v2'
import config from '../../../config/main'

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
  subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
})

categorySchema.pre('deleteOne', async function (next) {
  const category = await this.model
    .findOne({ _id: this._conditions._id })
    .populate('subCategories')
    .populate({
      path: 'subCategories',
      populate: {
        path: 'products',
        model: 'Product',
      },
    })
  const productsToDelete = []
  const VariantsToDelete = []

  category.subCategories.forEach((subCategory) => {
    subCategory.products.forEach((product) => {
      productsToDelete.push(product)
      product.variants.map((variant) => VariantsToDelete.push(variant))
    })
  })
  await Variant.deleteMany({ _id: { $in: VariantsToDelete } })
  await Product.deleteMany({
    _id: { $in: productsToDelete.map((product) => product._id) },
  })
  await SubCategory.deleteMany({
    _id: { $in: category.subCategories.map((subCategory) => subCategory._id) },
  })
  next()
})
export default config.db.shared.connection.model('Category', categorySchema)
