import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const language = localStorage.getItem("language") || "bs";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        // ✅ API call
        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data.user; 
        setUser(userData);

        if (!userData.location) {
          navigate("/profile");
          return;
        }

        // ✅ Weather API call
        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${userData.location}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&units=metric`
        );

        setWeather(weatherRes.data);
      } catch (error) {
        console.error("❌ Greška pri učitavanju profila:", error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading)
    return (
      <Container sx={{ textAlign: "center", mt: 5 }}>
        <CircularProgress />
      </Container>
    );

  if (!user)
    return (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        {language === "bs"
          ? "Nije moguće učitati korisnika."
          : "Unable to load user."}
      </Typography>
    );

  if (!weather || !weather.weather)
    return (
      <Typography align="center" color="error" sx={{ mt: 4 }}>
        {language === "bs"
          ? "Podaci o vremenu nisu dostupni."
          : "Weather data not available."}
      </Typography>
    );

  const description =
    language === "bs"
      ? {
          clear: "vedro",
          clouds: "oblačno",
          rain: "kišovito",
          snow: "snježno",
          mist: "maglovito",
        }[weather.weather[0].main.toLowerCase()] ||
        weather.weather[0].description
      : weather.weather[0].description;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        {language === "bs"
          ? `Dobrodošao, ${user.username}! 👋`
          : `Welcome, ${user.username}! 👋`}
      </Typography>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6">
            {language === "bs"
              ? `Vrijeme u ${user.location}:`
              : `Weather in ${user.location}:`}
          </Typography>
          <Typography>
            🌡️ {weather.main.temp.toFixed(1)}°C — {description}
          </Typography>
        </CardContent>
      </Card>

      {user.favoriteCrops && user.favoriteCrops.length > 0 && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6">
              {language === "bs" ? "Omiljene kulture:" : "Favorite crops:"}
            </Typography>
            <Typography>{user.favoriteCrops.join(", ")}</Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
