import { Storage } from '@google-cloud/storage'

type Audio = {
  name: string
}

type Args = {
  slug: string
  start: number
  end: number
}

const getAudio = async (slug: string) => {
  const storage = new Storage()
  const [files] = await storage.bucket(process.env.bucketName || '').getFiles()
  const audio = files.filter((audio: Audio) => audio.name === slug)

  if (audio.length === 0) {
    throw new Error(`L'audio ${slug} doesn't exist`)
  }

  return audio
}

const getAudioSize = async (slug: string) => {
  const audio = await getAudio(slug)

  if (audio.length === 0) {
    throw new Error(`L'audio ${slug} doesn't exist`)
  }

  return audio[0].metadata.size
}

const getAudioStream = async (args: Args) => {
  const { slug, start, end } = args
  const audio = await getAudio(slug)
  if (audio.length === 0) {
    throw new Error(`L'audio ${slug} doesn't exist`)
  }
  return audio[0].createReadStream({ start, end })
}

export { getAudioSize, getAudioStream }
