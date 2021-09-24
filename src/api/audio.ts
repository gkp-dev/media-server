import { Router } from 'express'
const router = Router()

import { getAudioSize, getAudioStream } from '../functions/audio'

router.get('/:slug/stream', async (req, res) => {
  // 1) retreive the the slug
  const { slug } = req.params

  console.log(req.headers.range)

  //@ts-ignore
  let [start = 0, end = 1024] = req.headers.range
    .replace(/bytes=/, '')
    .split('-')
    .map(Number)

  end = start + 1024

  // 2) get the audioSize (start,end)
  let size = 0
  try {
    //@ts-ignore
    size = await getAudioSize(slug)
  } catch (err) {
    return res.status(404).json({ err })
  }

  // 3) get audioStream
  const audioStream = await getAudioStream({ slug, start, end })

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
