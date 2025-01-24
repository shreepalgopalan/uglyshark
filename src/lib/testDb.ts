const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  try {
    await prisma.$connect()
    console.log('Database connection successful')

    // Test admin creation
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@uglyshark.com',
        password: 'hashedpassword123',
        name: 'Admin User',
        role: 'admin'
      }
    })
    console.log('Admin created:', admin)

    // Test user count
    const userCount = await prisma.user.count()
    console.log(`Current user count: ${userCount}`)

  } catch (error) {
    console.error('Database test failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()