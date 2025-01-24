const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:Alexand3r@localhost:5432/UglyShark'
}