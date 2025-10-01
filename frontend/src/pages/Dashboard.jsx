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

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(
        language === "bs"
          ? "Geolokacija nije podržana u tvom pretraživaču"
          : "Geolocation is not supported by your browser"
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
        } catch (err) {
          setError(
            language === "bs"
              ? "Neuspjelo preuzimanje podataka o vremenu"
              : "Failed to fetch weather data"
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(
          language === "bs"
            ? "Nije moguće preuzeti lokaciju"
            : "Unable to retrieve location"
        );
        setLoading(false);
      }
    );
  }, [language]);

  const getRecommendation = () => {
    if (!weather) return "";
    const temp = weather.main.temp;
    const condition = weather.weather[0].main.toLowerCase();

    if (language === "bs") {
      if (temp > 25 && condition.includes("clear"))
        return "☀ Vrijeme je pogodno za žetvu!";
      if (temp >= 10 && temp <= 25 && condition.includes("cloud"))
        return "🌱 Dobro vrijeme za sjetvu!";
      if (condition.includes("rain"))
        return "🌧 Izbjegavajte radove na polju danas.";
      return "ℹ Nastavite pratiti vremenske uslove.";
    } else {
      if (temp > 25 && condition.includes("clear"))
        return "☀ The weather is great for harvesting!";
      if (temp >= 10 && temp <= 25 && condition.includes("cloud"))
        return "🌱 Good conditions for sowing!";
      if (condition.includes("rain"))
        return "🌧 Avoid field work today.";
      return "ℹ Keep monitoring weather conditions.";
    }
  };

  if (loading)
    return (
      <CircularProgress sx={{ display: "block", m: "20px auto" }} />
    );
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <Box>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        {language === "bs"
          ? `Kontrolna ploča - Dobrodošao ${username}`
          : `Dashboard - Welcome ${username}`}
      </Typography>

      <Card sx={{ maxWidth: 400, m: "20px auto", p: 2, bgcolor: "#f4fff4" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {language === "bs"
              ? `Vrijeme u ${weather.name}`
              : `Weather in ${weather.name}`}
          </Typography>
          <Typography>
            🌡 {language === "bs" ? "Temperatura" : "Temperature"}:{" "}
            {weather.main.temp} °C
          </Typography>
          <Typography>
            ☁ {language === "bs" ? "Uslov" : "Condition"}:{" "}
            {weather.weather[0].description}
          </Typography>
          <Typography>
            💨 {language === "bs" ? "Vjetar" : "Wind"}: {weather.wind.speed} m/s
          </Typography>
          <Typography>
            💧 {language === "bs" ? "Vlažnost" : "Humidity"}:{" "}
            {weather.main.humidity}%
          </Typography>
        </CardContent>
      </Card>

      <Card
        sx={{ maxWidth: 400, m: "20px auto", p: 2, bgcolor: "#fff9e6" }}
      >
        <CardContent>
          <Typography variant="h6">
            {language === "bs" ? "Preporuka" : "Recommendation"}
          </Typography>
          <Typography>{getRecommendation()}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Dashboard;
