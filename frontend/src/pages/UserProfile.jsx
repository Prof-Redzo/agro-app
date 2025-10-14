import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Stack,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserProfile({ language }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [favoriteCrops, setFavoriteCrops] = useState([]);
  const [newCrop, setNewCrop] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data.user;
        setUsername(user.username || "");
        setLocation(user.location || "");
        setFavoriteCrops(user.favoriteCrops || []);
      } catch (err) {
        console.error("❌ Error loading profile:", err);
        setMessage(
          language === "bs"
            ? "Greška pri učitavanju profila."
            : "Error loading profile."
        );
      }
    };
    fetchProfile();
  }, [language, navigate]);

  // ✅ Save profile
  const saveProfile = async (loc, crops) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        { location: loc, favoriteCrops: crops },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedUser = res.data.user;
      setLocation(updatedUser.location);
      setFavoriteCrops(updatedUser.favoriteCrops);
      setMessage(
        language === "bs" ? "Profil ažuriran ✅" : "Profile updated ✅"
      );

      // ✅ Redirect on dashboard 
      if (updatedUser.location && updatedUser.favoriteCrops.length > 0) {
        setTimeout(() => navigate("/dashboard"), 1200);
      }
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      setMessage(
        language === "bs"
          ? "Greška pri ažuriranju profila"
          : "Failed to update profile"
      );
    }
  };

  // ✅ Add new crop
  const handleAddCrop = async () => {
    if (!newCrop.trim()) return;
    const updated = [...favoriteCrops, newCrop.trim()];
    await saveProfile(location, updated);
    setNewCrop("");
  };

  // ✅ Delete crop
  const handleDeleteCrop = async (crop) => {
    const updated = favoriteCrops.filter((c) => c !== crop);
    await saveProfile(location, updated);
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {language === "bs" ? "Korisnički profil" : "User Profile"}
      </Typography>

      <TextField
        label={language === "bs" ? "Korisničko ime" : "Username"}
        fullWidth
        sx={{ mb: 2 }}
        value={username}
        disabled
      />

      <TextField
        label={language === "bs" ? "Lokacija" : "Location"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <Typography variant="h6">
        {language === "bs" ? "Omiljene kulture" : "Favorite Crops"}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
        {favoriteCrops.map((crop) => (
          <Chip
            key={crop}
            label={crop}
            onDelete={() => handleDeleteCrop(crop)}
            color="success"
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>

      <Box sx={{ mt: 2 }}>
        <TextField
          label={language === "bs" ? "Dodaj kulturu" : "Add crop"}
          value={newCrop}
          onChange={(e) => setNewCrop(e.target.value)}
          sx={{ mr: 1 }}
        />
        <Button variant="contained" color="success" onClick={handleAddCrop}>
          {language === "bs" ? "Dodaj" : "Add"}
        </Button>
      </Box>

      <Button
        variant="contained"
        sx={{ mt: 3, bgcolor: "green" }}
        onClick={() => saveProfile(location, favoriteCrops)}
      >
        {language === "bs" ? "Spasi promjene" : "Save changes"}
      </Button>

      {message && (
        <Typography
          sx={{ mt: 2 }}
          color={message.includes("✅") ? "green" : "error"}
        >
          {message}
        </Typography>
      )}
    </Paper>
  );
}

export default UserProfile;
