# Winjhen Shop - Setup Guide

This guide will walk you through setting up the Winjhen Shop e-commerce platform on your local machine.

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd winjhen-shop-ecommerce

# Install dependencies
npm install
```

## Step 2: Database Setup

### Install PostgreSQL
1. Download and install PostgreSQL from the official website
2. During installation, note down:
   - Username (usually `postgres`)
   - Password (set this during installation)
   - Port (default: 5432)

### Create Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE winjhen_shop_db;

# Exit psql
\q
```

## Step 3: Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Connection
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/winjhen_shop_db"

# JWT Secret (generate a random string)
JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"

# NextAuth Configuration
NEXTAUTH_SECRET="your-nextauth-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

**Important**: Replace `your_password` with your actual PostgreSQL password.

## Step 4: Database Migration

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

## Step 5: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Test the System

### Test Accounts Created by Seed Script

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@winjhenshop.com | admin123 |
| Employee | employee@winjhenshop.com | employee123 |
| Reseller | reseller@winjhenshop.com | reseller123 |
| Customer | customer@winjhenshop.com | customer123 |

### Testing Flow

1. **Visit the homepage** - [http://localhost:3000](http://localhost:3000)
2. **Test customer signup** - [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
3. **Test login** - [http://localhost:3000/auth/login](http://localhost:3000/auth/login)
4. **Test admin features** - Login as admin and visit `/admin/create-account`
5. **Test dashboard** - Login with any account to see role-based dashboard

## Troubleshooting

### Common Issues

#### Database Connection Error
```
Error: PgConnectionError: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Ensure PostgreSQL is running and the connection string is correct.

#### Prisma Client Error
```
Error: PrismaClient is unable to be instantiated
```
**Solution**: Run `npm run db:generate` to regenerate the Prisma client.

#### Authentication Issues
```
Error: Invalid credentials
```
**Solution**: Check that the database was seeded properly with `npm run db:seed`.

### Reset Database

If you need to start fresh:

```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS winjhen_shop_db;"
psql -U postgres -c "CREATE DATABASE winjhen_shop_db;"

# Run migrations and seed again
npm run db:migrate
npm run db:seed
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database operations
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database
npm run db:studio      # Open Prisma Studio

# Linting
npm run lint
```

## Next Steps

Once the basic setup is working:

1. **Customize the UI** - Modify components in `components/` directory
2. **Add products** - Use the admin interface to create products
3. **Test orders** - Create test orders as different user types
4. **Configure email** - Set up email services for password reset
5. **Add payment** - Integrate payment gateways

## Production Deployment

Before deploying to production:

1. **Change default passwords** - All test accounts use simple passwords
2. **Secure environment variables** - Use strong, unique secrets
3. **Set up SSL** - Enable HTTPS for security
4. **Configure email** - Set up proper email services
5. **Database backup** - Implement regular backup procedures

## Support

If you encounter issues:

1. Check the console for error messages
2. Verify database connection and credentials
3. Ensure all dependencies are installed
4. Check that PostgreSQL is running
5. Review the README.md for additional information

---

**Happy coding! 🚀**
