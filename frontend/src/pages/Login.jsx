import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import api from "../api/axios.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.username);

      setSuccess("✅ Login successful!");
      setError("");

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Login failed.");
      setSuccess("");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Box>

      {error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="primary" align="center" sx={{ mt: 2 }}>
          {success}
        </Typography>
      )}
    </Paper>
  );
}

export default Login;
