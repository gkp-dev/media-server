import { Router } from 'express'
const router = Router()

import getAudioSize from '../functions/getAudioSize'
import getAudioStream from '../functions/getAudioStream'

router.get('/:slug/stream', (req, res) => {
  // 1) retreive the the slug
  const { slug } = req.params

  // 2) get the audioSize (start,end)
  const { size } = getAudioSize(slug)

  let start = 0
  let end = 1024

  // 3) get audioStream
  const audioStream = getAudioStream({ slug, start, end })

  // 4) send the the audioSize with
  audioStream.pipe(res)

  res
    .status(206)
    .set({
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': 1024,
      'Content-Type': 'audio/mpeg',
    })
    .json({
      audioName: slug,
      audioSize: size,
      end,
      start,
    })
})

export default router
