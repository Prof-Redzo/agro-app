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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        const res = await axios.get("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUser = res.data.user;
        setUser(fetchedUser);

        if (!fetchedUser?.location) {
          navigate("/profile");
          return;
        }

        const weatherRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${fetchedUser.location}&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }&units=metric`
        );
        setWeather(weatherRes.data);

        const today = new Date().toISOString().split("T")[0];
        const lastShown = localStorage.getItem("lastPlantTipShown");
        if (lastShown !== today) {
          showPlantingRecommendation(weatherRes.data, fetchedUser);
          localStorage.setItem("lastPlantTipShown", today);
        }
      } catch (error) {
        console.error("❌ Greška pri učitavanju profila:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const showPlantingRecommendation = (weatherData, userData) => {
    if (!weatherData) return;

    const temp = weatherData.main.temp;
    const weatherMain = weatherData.weather[0].main.toLowerCase();

    let message = "";

    if (language === "bs") {
      if (temp > 10 && temp < 25 && weatherMain.includes("cloud"))
        message = "Odličan dan za sadnju! 🌱 Iskoristi blago oblačno vrijeme.";
      else if (temp > 25)
        message = "Previše je toplo za sadnju danas ☀️. Pokušaj rano ujutro.";
      else if (temp < 5)
        message = "Prehladno je za sadnju 🥶. Sačekaj toplije dane.";
      else
        message = "Vrijeme je stabilno — možeš planirati radove u polju! 🌾";
    } else {
      if (temp > 10 && temp < 25 && weatherMain.includes("cloud"))
        message = "Perfect day for planting! 🌱 Mild clouds and nice temperature.";
      else if (temp > 25)
        message = "Too hot for planting today ☀️. Try early in the morning.";
      else if (temp < 5)
        message = "Too cold for planting 🥶. Wait for warmer days.";
      else
        message = "Weather looks fine — you can plan your field work! 🌾";
    }

    toast.info(message, {
      position: "bottom-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

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

  const displayName = user?.name || user?.username || user?.email?.split("@")[0] || (language === "bs" ? "Korisniče" : "User");

  return (
    <Container sx={{ mt: 5 }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom>
        {language === "bs"
          ? `Dobrodošao, ${displayName}! 👋`
          : `Welcome, ${displayName}! 👋`}
      </Typography>

      <Card sx={{ mb: 3, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6">
            {language === "bs"
              ? `Vrijeme u ${user.location}:`
              : `Weather in ${user.location}:`}
          </Typography>
          <Typography sx={{ mt: 1, fontSize: 18 }}>
            🌡️ {weather.main.temp}°C — {description}
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {language === "bs" ? "Omiljene kulture:" : "Favorite crops:"}
          </Typography>
          <Typography sx={{ fontSize: 16 }}>
            {user.favoriteCrops?.length > 0
              ? user.favoriteCrops.join(", ")
              : language === "bs"
              ? "Nema omiljenih kultura"
              : "No favorite crops"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Dashboard;
