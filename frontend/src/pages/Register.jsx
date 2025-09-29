import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import api from "../api/axios.js";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });
      setSuccess("✅ Registration successful! You can now login.");
      setError("");
      setUsername("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Registration failed.");
      setSuccess("");
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleRegister}>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Register
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

export default Register;
