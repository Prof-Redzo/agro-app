## 🖥️ 2️⃣ FRONTEND — `frontend/README.md`

# 🌿 Agro-App Frontend

The **frontend** part of the Agro-App, built with **React (Vite)** and **Material UI (MUI)**.

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
