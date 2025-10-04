import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
} from "@mui/material";
import {
  Spa,
  Grain,
  Grass,
  Apple,
  LocalFlorist,
  EmojiNature,
  WaterDrop,
} from "@mui/icons-material";

const culturesData = [
  {
    name_bs: "Pšenica",
    name_en: "Wheat",
    description_bs:
      "Jedna od najvažnijih žitarica na svijetu, koristi se za proizvodnju brašna.",
    description_en:
      "One of the most important grains in the world, used for flour production.",
    icon: <Grain fontSize="large" sx={{ color: "#8b5a2b" }} />,
  },
  {
    name_bs: "Kukuruz",
    name_en: "Corn",
    description_bs:
      "Kukuruz je osnovna hrana i koristi se i za ishranu životinja.",
    description_en: "Corn is a staple food and also used for animal feed.",
     icon: <EmojiNature fontSize="large" sx={{ color: "#f1c40f" }} />,
  },
  {
    name_bs: "Krompir",
    name_en: "Potato",
    description_bs:
      "Krompir je važna prehrambena kultura u gotovo svim dijelovima BiH.",
    description_en:
      "Potato is an essential crop in almost all parts of Bosnia.",
    icon: <Spa fontSize="large" sx={{ color: "#a1887f" }} />,
  },
  {
    name_bs: "Malina",
    name_en: "Raspberry",
    description_bs:
      "Vrlo važna voćna kultura u BiH, posebno u brdskim područjima.",
    description_en:
      "A very important fruit crop in Bosnia, especially in hilly areas.",
    icon: <LocalFlorist fontSize="large" sx={{ color: "#e91e63" }} />,
  },
  {
    name_bs: "Kupina",
    name_en: "Blackberry",
    description_bs:
      "Kupina je zdravo voće bogato antioksidansima, često uzgajana uz malinu.",
    description_en:
      "Blackberry is a healthy fruit rich in antioxidants, often grown alongside raspberries.",
    icon: <LocalFlorist fontSize="large" sx={{ color: "#4a148c" }} />,
  },
  {
    name_bs: "Jabuka",
    name_en: "Apple",
    description_bs:
      "Jabuka je široko rasprostranjena voćka i značajan izvozni proizvod BiH.",
    description_en:
      "Apple is a widely cultivated fruit and an important export product of Bosnia.",
    icon: <Apple fontSize="large" sx={{ color: "#e74c3c" }} />,
  },
  {
    name_bs: "Ječam",
    name_en: "Barley",
    description_bs: "Koristi se većinom za proizvodnju stočne hrane.",
    description_en: "Used mostly for animal feed.",
    icon: <Grass fontSize="large" sx={{ color: "#9ccc65" }} />,
  },
  {
    name_bs: "Raž",
    name_en: "Rye",
    description_bs: "Raž se koristi u proizvodnji hljeba.",
    description_en: "Rye is used in the production of bread.",
    icon: <Grain fontSize="large" sx={{ color: "#c0a16b" }} />,
  },
  {
    name_bs: "Soja",
    name_en: "Soybean",
    description_bs:
      "Biljka bogata proteinima, koristi se u prehrambenoj industriji i stočnoj hrani.",
    description_en:
      "A protein-rich plant used in food industry and animal feed.",
    icon: <WaterDrop fontSize="large" sx={{ color: "#009688" }} />,
  },
];

export default function Cultures({ language }) {
  const username = localStorage.getItem("username");

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4 }}>
        {language === "bs"
          ? "Poljoprivredne kulture u Bosni i Hercegovini"
          : "Agricultural Crops in Bosnia and Herzegovina"}
      </Typography>

      {!username && (
        <Alert severity="info" sx={{ mb: 4 }}>
          {language === "bs"
            ? "Za vremenske preporuke o sjetvi i žetvi prijavite se i posjetite Asistenta."
            : "For weather-based planting and harvesting recommendations, log in and visit the Dashboard."}
        </Alert>
      )}

      <Grid container spacing={3}>
        {culturesData.map((culture, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                bgcolor: "#f7fff7",
                borderRadius: "16px",
                boxShadow: 3,
                height: "100%",
                textAlign: "center",
                p: 2,
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {culture.icon}
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2e7d32",
                    fontWeight: "bold",
                    mb: 1,
                    mt: 1,
                  }}
                >
                  {language === "bs" ? culture.name_bs : culture.name_en}
                </Typography>
                <Typography variant="body1">
                  {language === "bs"
                    ? culture.description_bs
                    : culture.description_en}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
