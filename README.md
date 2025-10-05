🧩 1️⃣ ROOT — README.md
# 🌿 Agro-App

**Agro-App** is a web application that helps users explore, learn about, and promote various agricultural cultures through educational content, weather insights, and smart seasonal recommendations.  
The application consists of two main parts: **Frontend (React + MUI)** and **Backend (Node.js + Express + MongoDB)**.

---

## 🚀 Features

- 👤 User registration and login (JWT authentication)
- 🌦️ Dashboard with real-time weather and crop recommendations
- 🌍 Cultures page with local crops from Bosnia and Herzegovina
- 🌐 Multilingual support (Bosnian / English)
- 🔒 Protected routes (Dashboard available only to logged-in users)

---

## 🏗️ Project Structure



EcoCulture-Assistant/
│
├── backend/ # Node.js + Express + MongoDB API
│ ├── src/
│ ├── package.json
│ └── README.md
│
├── frontend/ # React + Material UI application
│ ├── src/
│ ├── package.json
│ └── README.md
│
└── README.md # this root project description


---

## ⚙️ Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Prof-Redzo/ecoculture-assistant.git
cd ecoculture-assistant

2. Run the backend
cd backend
npm install
npm run dev


Backend runs on http://localhost:5000.

3. Run the frontend

In another terminal:

cd frontend
npm install
npm run dev


Frontend runs on http://localhost:5173.

🌍 Environment Variables
Backend (.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENWEATHER_API_KEY=your_api_key_here

Frontend (.env)
VITE_API_URL=http://localhost:5000

🧪 Testing

You can test API routes with Postman or Jam.dev:

POST /api/auth/register

POST /api/auth/login

GET /api/weather (protected route)

🧱 Technologies
🔹 Frontend

React (Vite)

Material UI (MUI)

Axios

React Router

Context API (or prop drilling for language)

🔹 Backend

Node.js + Express

MongoDB + Mongoose

JWT Authentication

bcrypt.js (password hashing)

dotenv

CORS

🌐 Language Support

The app supports two languages:

🇧🇦 Bosnian

🇬🇧 English

The selected language is stored in the state and synchronized with localStorage.

👨‍🏫 Author

Redžo Efendić
📍 Encode alumnus, ZeForge Zenica community member
💻 GitHub: Prof-Redzo

📜 License

MIT License © 2025 Redžo Efendić


---

## 🖥️ 2️⃣ FRONTEND — `frontend/README.md`

```markdown
# 🌿 Agro - App Frontend

The **frontend** part of the EcoCulture Assistant, built with **React (Vite)** and **Material UI (MUI)**.

---

## ⚙️ Setup

```bash
cd frontend
npm install
npm run dev


The application will be available at:
👉 http://localhost:5173

📂 Project Structure
src/
├── components/
│   └── ...
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   └── Cultures.jsx
├── App.jsx
└── main.jsx

🌍 Multilingual Support

The app supports Bosnian and English languages.
You can switch language via the EN / BS button in the navigation bar.
The selected language is saved to localStorage.

🔒 Authentication

Tokens and usernames are stored in localStorage

Protected routes are managed using the ProtectedRoute component

After successful login or registration, the user is redirected to the Dashboard

🧠 Libraries Used

React Router DOM

Material UI

Axios

Vite

dotenv (via import.meta.env)

📸 Main Pages

🏠 Home – Welcome and overview page

🌍 Cultures – Overview of agricultural cultures in Bosnia and Herzegovina

📊 Dashboard – Real-time weather data and planting/harvesting advice

🔐 Login / Register – User authentication

📜 License

MIT License © 2025 Redžo Efendić