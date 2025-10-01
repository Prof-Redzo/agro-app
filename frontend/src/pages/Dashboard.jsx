import { useEffect, useState } from "react";
import {
  Typography,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";

function Dashboard() {
  const [weather, setWeather] = useState(null); 
  const [recommendations, setRecommendations] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const weatherRes = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`
          );

          setWeather(weatherRes.data);

          const recRes = await axios.get("http://localhost:5000/api/recommendation");
          setRecommendations(recRes.data.recommendations || []);
        } catch (err) {
          console.error(err);
          setError("Failed to fetch weather or recommendations");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Unable to retrieve location");
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", m: "20px auto" }} />;
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  return (
    <>
      <Card sx={{ maxWidth: 400, m: "20px auto", p: 2, bgcolor: "#f4fff4" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Weather in {weather.name}
          </Typography>
          <Typography>🌡 Temperature: {weather.main.temp} °C</Typography>
          <Typography>☁ Condition: {weather.weather[0].description}</Typography>
          <Typography>💨 Wind: {weather.wind.speed} m/s</Typography>
          <Typography>💧 Humidity: {weather.main.humidity}%</Typography>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 500, m: "20px auto", p: 2, bgcolor: "#e8f5e9" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            🌱 Recommendations
          </Typography>
          {recommendations.length > 0 ? (
            <List>
              {recommendations.map((rec, i) => (
                <ListItem key={i}>
                  <ListItemText
                    primary={rec.message}
                    secondary={`Crop: ${rec.crop}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No suitable crops for current weather.</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default Dashboard;
