import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useState } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cultures from "./pages/Cultures";

// 🔒 Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        Access denied. Please log in first.
      </Typography>
    );
  }
  return children;
}

function App() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  // 🌐 Language: Bosnian / English
  const [language, setLanguage] = useState("bs");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "bs" ? "en" : "bs"));
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#e9fce9", minHeight: "100vh" }}>
      {/* 🔝 Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#6bb36a" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button component={Link} to="/" color="inherit">
              {language === "bs" ? "Početna" : "Home"}
            </Button>

            <Button component={Link} to="/cultures" color="inherit">
              {language === "bs" ? "Kulture" : "Cultures"}
            </Button>

            {!username ? (
              <>
                <Button component={Link} to="/login" color="inherit">
                  {language === "bs" ? "Prijava" : "Login"}
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  {language === "bs" ? "Registracija" : "Register"}
                </Button>
              </>
            ) : (
              <Button component={Link} to="/dashboard" color="inherit">
                {language === "bs" ? "Asistent" : "Dashboard"}
              </Button>
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleLanguage}
            >
              {language === "bs" ? "EN" : "BS"}
            </Button>

            {username && (
              <Button variant="contained" color="error" onClick={handleLogout}>
                {language === "bs" ? "Odjava" : "Logout"}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📄 Main */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={<Home language={language} username={username} />}
          />
          <Route path="/login" element={<Login language={language} />} />
          <Route path="/register" element={<Register language={language} />} />
          <Route path="/cultures" element={<Cultures language={language} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard language={language} username={username} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
