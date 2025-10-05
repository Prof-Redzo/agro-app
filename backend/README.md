## ⚙️ 3️⃣ BACKEND — `backend/README.md`
# 🌿 Agro-App Backend

This is the **backend** for the Agro-App.  
Built with **Node.js (Express)** and connected to **MongoDB**.

---

## 🚀 Setup

```bash
cd backend
npm install
npm run dev
Server will start at:
👉 http://localhost:5000

📂 Project Structure

src/
├── models/
│   ├── User.js
│   └── ...
├── routes/
│   ├── authRoutes.js
│   ├── weatherRoutes.js
│   └── ...
├── middleware/
│   └── authMiddleware.js
├── server.js
└── config/
    └── db.js
🔑 Environment Variables (.env)
bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_api_key_here
🔒 Authentication
Register and login with bcrypt password hashing

JWT tokens used for protected routes

Token is sent via the Authorization header (Bearer <token>)

🌦️ API Routes
🔹 Auth
POST /api/auth/register → create new user

POST /api/auth/login → returns JWT token and username

🔹 Weather
GET /api/weather → returns current weather and crop recommendations (JWT protected)

🧱 Technologies Used
Node.js

Express.js

MongoDB (Mongoose)

JWT

bcrypt.js

dotenv

CORS

Axios (for external weather API)

🧪 Testing
Use Postman or Jam.dev to test the routes:

Register user
POST /api/auth/register

Login
POST /api/auth/login

Use the received token for
GET /api/weather
Header:
Authorization: Bearer <token>

📜 License
MIT License © 2025 Redžo Efendić
