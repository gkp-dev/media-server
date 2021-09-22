import fs from 'fs'
import path from 'path'

type Args = {
  slug: string
  start: number
  end: number
}
const getAudioStream = (args: Args) => {
  const { slug, start, end } = args
  const audioStream = fs.createReadStream(
    path.join(process.cwd(), 'audio', slug),
    {
      start,
      end,
    }
  )

  return audioStream
}

export default getAudioStream
