import { Request, Response } from 'express'
import { Configuration, ConfigurationDocument } from '../models'
import apicache from 'apicache'

export const get = async (req: Request, res: Response) => {
  try {
    const configs = await Configuration.getSingleton()
    if (!configs) throw Error()

    res.status(200).json(configs.toObject())
  } catch (error: unknown) {
    res.status(404).json({ error: 'Configuration document not found' })
  }
}

export const update = async (req: Request, res: Response) => {
  const configs = await Configuration.getSingleton()

  if (req.body.facebookKey !== undefined)
    configs.facebookKey = req.body.facebookKey.toString()

  if (req.body.instagramKey !== undefined)
    configs.instagramKey = req.body.instagramKey.toString()

  if (req.body.googleKey !== undefined)
    configs.googleKey = req.body.googleKey.toString()

  if (req.body.facebookId !== undefined)
    configs.facebookId = req.body.facebookId.toString()

  if (req.body.instagramId !== undefined)
    configs.instagramId = req.body.instagramId.toString()

  if (req.body.youtubeId !== undefined)
    configs.youtubeId = req.body.youtubeId.toString()

  try {
    await configs.save()

    apicache.clear([])
    res.status(200).json({
      message: 'Fields updated successfully',
    })
  } catch (error: unknown) {
    res.status(400).json({ error: (error as Error).message })
  }
}
