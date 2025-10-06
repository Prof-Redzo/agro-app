import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Stack,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

function UserProfile({
  language,
  setLanguage,
  username,
  setUsername,
  location,
  setLocation,
  favoriteCrops,
  setFavoriteCrops,
}) {
  const [newCrop, setNewCrop] = useState("");

  const handleAddCrop = () => {
    if (newCrop && !favoriteCrops.includes(newCrop)) {
      setFavoriteCrops([...favoriteCrops, newCrop]);
      setNewCrop("");
    }
  };

  const handleDeleteCrop = (crop) => {
    setFavoriteCrops(favoriteCrops.filter((c) => c !== crop));
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        {language === "bs" ? "Korisnički profil" : "User Profile"}
      </Typography>

      <TextField
        label={language === "bs" ? "Ime" : "Name"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label={language === "bs" ? "Lokacija" : "Location"}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        select
        label={language === "bs" ? "Jezik aplikacije" : "App language"}
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="bs">Bosanski</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </TextField>

      <Typography sx={{ mt: 2 }}>
        {language === "bs" ? "Omiljene kulture:" : "Favorite crops:"}
      </Typography>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
        {favoriteCrops.map((crop) => (
          <Chip
            key={crop}
            label={crop}
            onDelete={() => handleDeleteCrop(crop)}
            color="success"
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
    </Box>
  );
}

export default UserProfile;