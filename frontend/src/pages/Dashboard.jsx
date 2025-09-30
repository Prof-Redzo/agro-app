import { useEffect, useState } from "react";
import { Container, Typography, Paper, Box, CircularProgress, List, ListItem, ListItemText } from "@mui/material";
import api from "../api/axios.js";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/recommendation");
        setWeather(res.data.weather);
        setRecommendations(res.data.recommendations);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load dashboard data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        🌱 Dashboard
      </Typography>

      {error && (
        <Typography color="error" align="center">
          {error}
        </Typography>
      )}

      {weather && (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Current Weather</Typography>
          <Typography>🌡️ Temperature: {weather.temperature}°C</Typography>
          <Typography>💧 Humidity: {weather.humidity}%</Typography>
          <Typography>☔ Rainfall: {weather.rainfall}</Typography>
        </Paper>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">Recommendations</Typography>
        {recommendations.length > 0 ? (
          <List>
            {recommendations.map((rec, i) => (
              <ListItem key={i}>
                <ListItemText primary={rec.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No recommendations available at the moment.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;
