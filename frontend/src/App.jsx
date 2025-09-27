import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h2>Welcome to Agriculture App 🌱</h2>} />
        <Route path="/login" element={<h2>Login Page</h2>} />
        <Route path="/register" element={<h2>Register Page</h2>} />
      </Routes>
    </div>
  );
}

export default App;
