# Job Portal Backend

Minimal Node + Express backend with MongoDB (Mongoose) and authentication endpoints.

Endpoints:
- POST `/api/auth/signup` { name, email, password }
- POST `/api/auth/login` { email, password }

Run locally:

```powershell
cd "Backend"
npm install
copy .env.example .env
# edit .env to set your MONGO_URI
npm run dev
```

Default server: http://localhost:4000
