import { Location } from '../models/shared'

export const findOne = async (locationCode: string) => {
  const location = await Location.findOne({ locationCode })
    .populate({
      path: 'user',
      model: 'User',
    })
    .exec()
  return location?.toObject()
}
