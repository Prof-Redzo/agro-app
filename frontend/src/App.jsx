import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container, Box } from "@mui/material";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#e9fce9", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ bgcolor: "#6bb36a" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
            {!username && (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </>
            )}
          </Box>
          {username && (
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Main */}
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={
              <Typography variant="h4" align="center" color="green">
                {username
                  ? `Welcome, ${username} 🌱`
                  : "Welcome to Agriculture App 🌱"}
              </Typography>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
