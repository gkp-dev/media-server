import { Router } from 'express'
const router = Router()
import audio from './audio'

router.use('/audio', audio)

router.get('/', (_req, res) => {
  res.json('Welcome to another api world')
})

router.get('/health-check', (_req, res) => {
  res.json({
    status: 200,
    isRunning: true,
    version: '1.0.0',
  })
})

export default router
