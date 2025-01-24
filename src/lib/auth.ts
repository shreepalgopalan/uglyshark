import jwt from 'jsonwebtoken'
import { env } from './env'

export function createAuthPayload(user: any) {
  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user',
    timestamp: Date.now()
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function createToken(payload: object) {
  if (!payload) throw new Error('Token payload cannot be null')
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1d' })
}
