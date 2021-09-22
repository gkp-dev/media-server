import fs from 'fs'
import path from 'path'

const getAudioSize = (slug: string) => {
  return fs.statSync(path.join(process.cwd(), 'audio', slug))
}

export default getAudioSize
