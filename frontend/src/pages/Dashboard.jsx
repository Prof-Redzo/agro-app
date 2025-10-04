import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import axios from "axios";

function Dashboard({ language, username }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendation, setRecommendation] = useState("");

  const weatherTranslations = {
    "clear sky": "vedro nebo",
    "few clouds": "malo oblaka",
    "scattered clouds": "raštrkani oblaci",
    "broken clouds": "pretežno oblačno",
    "overcast clouds": "oblačno",
    "light rain": "slaba kiša",
    "moderate rain": "umjerena kiša",
    "heavy intensity rain": "jaka kiša",
    "shower rain": "pljusak",
    "rain": "kiša",
    "thunderstorm": "grmljavina",
    "snow": "snijeg",
    "mist": "magla",
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        language === "bs"
          ? "Vaš pretraživač ne podržava geolokaciju."
          : "Geolocation is not supported by your browser."
      );
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`
          );

          setWeather(response.data);
          generateRecommendation(response.data);
        } catch (err) {
          console.error(err);
          setError(
            language === "bs"
              ? "Greška pri dohvaćanju podataka o vremenu."
              : "Failed to fetch weather data."
          );
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError(
          language === "bs"
            ? "Nije moguće dobiti vašu lokaciju."
            : "Unable to retrieve location."
        );
        setLoading(false);
      }
    );
  }, [language]);

  const generateRecommendation = (data) => {
    const month = new Date().getMonth() + 1;
    const temp = data.main.temp;
    let msg = "";

    if (month >= 3 && month <= 5 && temp > 10) {
      msg =
        language === "bs"
          ? "Idealno vrijeme za sjetvu proljetnih kultura 🌱"
          : "Perfect time to plant spring crops 🌱";
    } else if (month >= 7 && month <= 9 && temp > 20) {
      msg =
        language === "bs"
          ? "Vrijeme je za berbu ljetnih plodova 🍓"
          : "It's time to harvest summer fruits 🍓";
    } else if (month >= 10 && month <= 11 && temp < 15) {
      msg =
        language === "bs"
          ? "Vrijeme za pripremu zemlje za jesenju sadnju 🍂"
          : "Time to prepare soil for autumn planting 🍂";
    } else {
      msg =
        language === "bs"
          ? "Nema posebnih preporuka trenutno."
          : "No special recommendations at the moment.";
    }

    setRecommendation(msg);
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "20px auto" }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  // ✅ Translate - weather
  const description =
    language === "bs"
      ? weatherTranslations[weather.weather[0].description] ||
        weather.weather[0].description
      : weather.weather[0].description;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        {language === "bs"
          ? `Dobrodošao, ${username}! 👋`
          : `Welcome, ${username}! 👋`}
      </Typography>

      <Card
        sx={{
          maxWidth: 400,
          m: "20px auto",
          p: 2,
          bgcolor: "#f4fff4",
          boxShadow: 3,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {language === "bs"
              ? `Vrijeme u ${weather.name}`
              : `Weather in ${weather.name}`}
          </Typography>

          <Typography>🌡 {weather.main.temp.toFixed(1)} °C</Typography>
          <Typography>☁ {description}</Typography>
          <Typography>
            💧 {weather.main.humidity}%{" "}
            {language === "bs" ? "vlaga" : "humidity"}
          </Typography>
          <Typography>
            💨 {weather.wind.speed} m/s {language === "bs" ? "vjetar" : "wind"}
          </Typography>

          <Box sx={{ mt: 2, bgcolor: "#d9f7d9", p: 2, borderRadius: 2 }}>
            <Typography variant="body1" color="green">
              {recommendation}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;
