# Real-Time Messenger Application

A full-stack real-time messenger application built with modern web technologies.

## Tech Stack

### Frontend
- **Framework**: Next.js 15.2.0 with App Router
- **UI Components**: 
  - Custom components built with Radix UI primitives
  - Shadcn UI components
  - Tailwind CSS for styling
- **Authentication**: NextAuth.js v5 with multiple providers (Google, GitHub, Credentials)
- **Form Management**: 
  - React Hook Form
  - Zod for form validation
- **State Management**: React Hooks
- **Real-time Updates**: Pusher.js
- **Image Uploads**: Cloudinary
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **Real-time Server**: Pusher
- **Password Hashing**: bcryptjs

### Validation & Type Safety
- **Runtime Validation**: Zod schemas
- **Static Type Checking**: TypeScript
- **API Response Handling**: Custom utility functions
- **Database Types**: Prisma generated types

### Key Features

- Real-time messaging using Pusher
- Group chat functionality
- User presence detection
- Image sharing in conversations
- Message read receipts
- User profile customization
- Responsive design for all devices
- Social authentication (Google, GitHub)
- Email/Password authentication
- Username availability checking
- Form validation with error messages

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXT_PUBLIC_PUSHER_APP_KEY=
PUSHER_APP_ID=
PUSHER_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
GITHUB_ID=
GITHUB_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

4. Setup the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## Project Structure

```
├── actions/         # Server actions
├── app/            # Next.js app router pages
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── prisma/        # Database schema and client
├── public/        # Static assets
└── types/         # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License