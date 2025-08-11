# Winjhen Shop - E-commerce Platform

A comprehensive e-commerce platform built with Next.js, React, and PostgreSQL, featuring role-based access control for retail and wholesale business operations.

## Features

### User Role Management
- **Admin**: Full system access, user management, order confirmation
- **Employee**: Product management (add/edit, no deletion)
- **Retail Customer**: Regular shopping with retail pricing
- **Reseller Customer**: Bulk orders with special pricing and deferred payment options

### Core Functionality
- User authentication and authorization
- Role-based access control
- Product inventory management
- Order processing and management
- Reseller order confirmation system
- Flexible payment options
- Modern, responsive UI

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI, Lucide React icons
- **Form Handling**: React hooks with validation

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd winjhen-shop-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/winjhen_shop_db"
   
   # JWT Secret
   JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret-key-here-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) Seed the database with initial data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The platform includes comprehensive data models for:

- **Users**: Role-based user accounts with profile information
- **Products**: Inventory items with pricing tiers
- **Orders**: Customer purchase records
- **Reseller Orders**: Special bulk order handling
- **Payments**: Flexible payment tracking

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Customer registration
- `POST /api/auth/create-account` - Admin creates employee/reseller accounts
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset with token

### NextAuth
- `GET/POST /api/auth/[...nextauth]` - NextAuth.js authentication routes

## User Flows

### Customer Registration
1. Visit `/auth/signup`
2. Fill out registration form
3. Account created as retail customer
4. Redirected to login

### Admin Account Creation
1. Admin logs in at `/auth/login`
2. Navigate to `/admin/create-account`
3. Create employee or reseller accounts
4. Set passwords and roles

### Authentication
1. All users login at `/auth/login`
2. Role-based redirects to appropriate dashboards
3. Session management with NextAuth.js

## Project Structure

```
winjhen-shop-ecommerce/
├── app/                    # Next.js app router
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── signup/        # Customer signup
│   │   └── forgot-password/ # Password reset
│   ├── admin/             # Admin-only pages
│   │   └── create-account/ # Account creation
│   ├── dashboard/         # User dashboard
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components
│   └── providers/         # Context providers
├── lib/                   # Utility functions
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema and migrations
│   └── schema.prisma      # Prisma schema
└── public/                # Static assets
```

## Development

### Adding New Features
1. Create database models in `prisma/schema.prisma`
2. Run migrations: `npx prisma migrate dev`
3. Create API routes in `app/api/`
4. Build UI components in `components/`
5. Add pages in `app/` directory

### Database Changes
```bash
# After modifying schema.prisma
npx prisma migrate dev --name description_of_changes
npx prisma generate
```

### Type Generation
```bash
# Generate Prisma types
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set production environment variables**
   - Update `DATABASE_URL` with production database
   - Set secure `JWT_SECRET` and `NEXTAUTH_SECRET`
   - Update `NEXTAUTH_URL` with production domain

3. **Deploy to your preferred platform**
   - Vercel (recommended for Next.js)
   - AWS, Google Cloud, or other cloud providers

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- Secure session management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a development version. For production use, ensure all security measures are properly configured and tested.
