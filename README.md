# WDD 430 Group Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Features

- **Next.js 15** - Latest version with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel Postgres** - Database integration ready
- **ESLint** - Code linting and formatting

## Environment Variables

Create a `.env.local` file in the root directory and add your environment variables:

```env
POSTGRES_URL="your-postgres-connection-string"
POSTGRES_PRISMA_URL="your-prisma-connection-string"
POSTGRES_URL_NON_POOLING="your-non-pooling-connection-string"
POSTGRES_USER="your-username"
POSTGRES_HOST="your-host"
POSTGRES_PASSWORD="your-password"
POSTGRES_DATABASE="your-database-name"
```

## Project Structure

```
├── public/          # Static assets
├── src/
│   ├── app/         # App Router pages and layouts
│   ├── components/  # Reusable components
│   ├── lib/         # Utility functions and configurations
│   └── types/       # TypeScript type definitions
├── .env.local       # Environment variables
├── next.config.js   # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json    # TypeScript configuration
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
