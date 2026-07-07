# JobPortal

A MERN job portal application with user authentication, email verification, company management, job posting, job browsing, saved jobs, and admin dashboards.

## Features

- User registration and login
- Email verification for new users
- Profile update with avatar upload
- Job browsing with detailed job descriptions
- Save jobs and view saved jobs
- Apply for jobs and manage applications
- Admin dashboards for companies, jobs, and applicants
- Cloudinary file uploads for user/company images
- Gmail-based email verification via Nodemailer

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Tailwind CSS
- Authentication: JWT
- File upload / image hosting: Cloudinary
- Email: Nodemailer + Gmail SMTP
- State management: Redux Toolkit

## Repository Structure

- `backend/` — Express API, controllers, models, routes, middleware, utils
- `frontend/` — React app, components, hooks, Redux slices, pages
- `package.json` — root scripts and backend dependencies
- `frontend/package.json` — frontend dependencies and Vite scripts

## Environment Variables

Create a `.env` file in the root of the repository with the following values:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/jobportal
SECRET_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173

EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

> `CLIENT_URL` is used to generate email verification links.

## Setup

1. Install backend dependencies:
   ```bash
   npm install
   ```

2. Install frontend dependencies:
   ```bash
   npm install --prefix frontend
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. Start the frontend app in a second terminal:
   ```bash
   npm run dev --prefix frontend
   ```

## Production Build

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

The backend serves the built frontend from `frontend/dist`.

## API Endpoints

- `POST /api/v1/user/...`
- `POST /api/v1/company/...`
- `POST /api/v1/job/...`
- `POST /api/v1/application/...`

## Notes

- Backend uses CORS configured for `http://localhost:5173`
- Frontend uses React Router for public and protected routes
- Email verification is required before login
- Cloudinary settings are loaded from environment variables

## License

This project is provided as-is. Update license information as needed.
