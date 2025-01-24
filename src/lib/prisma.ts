import { PrismaClient } from '@prisma/client'
import { env } from './env.config'

declare global {
  var prisma: PrismaClient | undefined
}

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
})

export const prisma = global.prisma || prismaClient

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
}