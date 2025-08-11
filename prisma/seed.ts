import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  })

  if (existingAdmin) {
    console.log('✅ Admin user already exists, skipping...')
    return
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@winjhenshop.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      emailVerified: true,
      phone: '+1234567890',
      address: '123 Admin Street',
      city: 'Admin City',
      state: 'AS',
      zipCode: '12345',
      country: 'United States'
    }
  })

  console.log('✅ Admin user created:', admin.email)
  console.log('🔑 Default password: admin123')
  console.log('⚠️  Remember to change this password in production!')

  // Create sample employee
  const employeePassword = await bcrypt.hash('employee123', 12)
  
  const employee = await prisma.user.create({
    data: {
      email: 'employee@winjhenshop.com',
      password: employeePassword,
      firstName: 'John',
      lastName: 'Employee',
      role: 'EMPLOYEE',
      isActive: true,
      emailVerified: true,
      phone: '+1234567891',
      address: '456 Employee Ave',
      city: 'Employee City',
      state: 'ES',
      zipCode: '54321',
      country: 'United States'
    }
  })

  console.log('✅ Sample employee created:', employee.email)
  console.log('🔑 Default password: employee123')

  // Create sample reseller
  const resellerPassword = await bcrypt.hash('reseller123', 12)
  
  const reseller = await prisma.user.create({
    data: {
      email: 'reseller@winjhenshop.com',
      password: resellerPassword,
      firstName: 'Jane',
      lastName: 'Reseller',
      role: 'RESELLER_CUSTOMER',
      isActive: true,
      emailVerified: true,
      phone: '+1234567892',
      address: '789 Reseller Blvd',
      city: 'Reseller City',
      state: 'RS',
      zipCode: '98765',
      country: 'United States'
    }
  })

  console.log('✅ Sample reseller created:', reseller.email)
  console.log('🔑 Default password: reseller123')

  // Create sample retail customer
  const customerPassword = await bcrypt.hash('customer123', 12)
  
  const customer = await prisma.user.create({
    data: {
      email: 'customer@winjhenshop.com',
      password: customerPassword,
      firstName: 'Bob',
      lastName: 'Customer',
      role: 'RETAIL_CUSTOMER',
      isActive: true,
      emailVerified: true,
      phone: '+1234567893',
      address: '321 Customer Way',
      city: 'Customer City',
      state: 'CS',
      zipCode: '13579',
      country: 'United States'
    }
  })

  console.log('✅ Sample customer created:', customer.email)
  console.log('🔑 Default password: customer123')

  console.log('🎉 Database seeding completed successfully!')
  console.log('\n📋 Test Accounts:')
  console.log('Admin: admin@winjhenshop.com / admin123')
  console.log('Employee: employee@winjhenshop.com / employee123')
  console.log('Reseller: reseller@winjhenshop.com / reseller123')
  console.log('Customer: customer@winjhenshop.com / customer123')
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
