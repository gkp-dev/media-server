import { Router } from 'express'
const router = Router()

import getAudioSize from '../functions/getAudioSize'
import getAudioStream from '../functions/getAudioStream'

router.get('/:slug/stream', (req, res) => {
  // 1) retreive the the slug
  const { slug } = req.params

  //@ts-ignore
  let [start = 0, end = 1024] = req.headers.range
    .replace(/bytes=/, '')
    .split('-')
    .map(Number)

  end = start + 1024

  // 2) get the audioSize (start,end)
  const { size } = getAudioSize(slug)

  console.log(start, end, size)

  // 3) get audioStream
  const audioStream = getAudioStream({ slug, start, end })

  // 4) send the the audioSize with
  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${size}`,
    'Content-Length': end - start,
    'Content-Type': 'audio/mpeg',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
  })
  audioStream.pipe(res)
})

export default router
