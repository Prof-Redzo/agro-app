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
import api from "../api/axios.js";

function UserProfile({ language }) {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [favoriteCrops, setFavoriteCrops] = useState([]);
  const [newCrop, setNewCrop] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        const user = res.data.user || res.data;

        setUsername(user.username || "");
        setLocation(user.location || "");
        setFavoriteCrops(user.favoriteCrops || []);
      } catch (err) {
        console.error("❌ Greška pri učitavanju profila:", err);
        setMessage(
          language === "bs"
            ? "Greška pri učitavanju profila."
            : "Error loading profile."
        );
      }
    };
    fetchProfile();
  }, [language]);

  const saveProfile = async (loc, crops) => {
    try {
      const res = await api.put("/user/profile", {
        location: loc,
        favoriteCrops: crops,
      });

      const updated = res.data.user;
      setFavoriteCrops(updated.favoriteCrops);
      setLocation(updated.location);
      setMessage(
        language === "bs" ? "Profil ažuriran ✅" : "Profile updated ✅"
      );
    } catch (err) {
      console.error("❌ Greška pri ažuriranju profila:", err);
      setMessage(
        language === "bs"
          ? "Greška pri ažuriranju profila."
          : "Failed to update profile."
      );
    }
  };

  const handleAddCrop = async () => {
    if (!newCrop.trim()) return;
    const updated = [...favoriteCrops, newCrop.trim()];
    await saveProfile(location, updated);
    setNewCrop("");
  };

  const handleDeleteCrop = async (crop) => {
    const updated = favoriteCrops.filter((c) => c !== crop);
    await saveProfile(location, updated);
  };

  const handleLocationBlur = (e) => {
    if (e.target.value !== location) {
      saveProfile(e.target.value, favoriteCrops);
    }
  };

  return (
    <Paper sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {language === "bs" ? "Korisnički profil" : "User Profile"}
      </Typography>

      <TextField
        label={language === "bs" ? "Ime" : "Username"}
        fullWidth
        sx={{ mb: 2 }}
        value={username}
        disabled
      />

      <TextField
        label={language === "bs" ? "Lokacija" : "Location"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onBlur={handleLocationBlur}
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
        <Button variant="contained" onClick={handleAddCrop}>
          {language === "bs" ? "Dodaj" : "Add"}
        </Button>
      </Box>

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
