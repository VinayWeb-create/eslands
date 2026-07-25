# Onebridge Infotech Clone

Premium MERN corporate website scaffold inspired by an IT consulting landing page.

## Project Structure

- `client/` - React + Vite frontend with Tailwind CSS
- `server/` - Express backend with MongoDB, Mongoose, Nodemailer

## Setup

1. Install dependencies
   - `cd client && npm install`
   - `cd server && npm install`

2. Create `.env` files
   - `server/.env` based on `server/.env.example`

3. Start development servers
   - `cd client && npm run dev`
   - `cd server && npm run dev`

## API Endpoints

- `POST /api/contact`
- `GET /api/careers`
- `POST /api/careers/apply`
- `POST /api/newsletter`

## Seed Data

- `cd server && node seed.js`
