import { Card, CardContent, Typography, Grid } from "@mui/material";

function getRecommendation(culture, language) {
  const month = new Date().getMonth() + 1; 

  const recommendations = {
    wheat: {
      bs: month >= 9 && month <= 11 
        ? "Vrijeme je za sjetvu pšenice." 
        : month >= 6 && month <= 7 
        ? "Vrijeme je za žetvu pšenice." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 9 && month <= 11 
        ? "It's time for wheat sowing." 
        : month >= 6 && month <= 7 
        ? "It's time for wheat harvest." 
        : "No specific activities right now.",
    },
    corn: {
      bs: month >= 4 && month <= 5 
        ? "Vrijeme je za sjetvu kukuruza." 
        : month >= 9 && month <= 10 
        ? "Vrijeme je za žetvu kukuruza." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 4 && month <= 5 
        ? "It's time for corn sowing." 
        : month >= 9 && month <= 10 
        ? "It's time for corn harvest." 
        : "No specific activities right now.",
    },
    potato: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju krompira." 
        : month >= 7 && month <= 9 
        ? "Vrijeme je za vađenje krompira." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for potato planting." 
        : month >= 7 && month <= 9 
        ? "It's time for potato harvest." 
        : "No specific activities right now.",
    },
    apple: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju jabuka." 
        : month >= 9 && month <= 10 
        ? "Vrijeme je za berbu jabuka." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for apple planting." 
        : month >= 9 && month <= 10 
        ? "It's time for apple harvest." 
        : "No specific activities right now.",
    },
    plum: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju šljiva." 
        : month === 8 
        ? "Vrijeme je za berbu šljiva." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for plum planting." 
        : month === 8 
        ? "It's time for plum harvest." 
        : "No specific activities right now.",
    },
    grapes: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju vinove loze." 
        : month === 9 
        ? "Vrijeme je za berbu grožđa." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for grapevine planting." 
        : month === 9 
        ? "It's time for grape harvest." 
        : "No specific activities right now.",
    },
    raspberry: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju malina." 
        : month >= 6 && month <= 7 
        ? "Vrijeme je za berbu malina." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for raspberry planting." 
        : month >= 6 && month <= 7 
        ? "It's time for raspberry harvest." 
        : "No specific activities right now.",
    },
    blackberry: {
      bs: month >= 3 && month <= 4 
        ? "Vrijeme je za sadnju kupina." 
        : month >= 7 && month <= 8 
        ? "Vrijeme je za berbu kupina." 
        : "Trenutno nema posebnih aktivnosti.",
      en: month >= 3 && month <= 4 
        ? "It's time for blackberry planting." 
        : month >= 7 && month <= 8 
        ? "It's time for blackberry harvest." 
        : "No specific activities right now.",
    },
  };

  return recommendations[culture][language];
}

function Cultures({ language }) {
  const cultures = [
    { key: "wheat", emoji: "🌾", bs: { name: "Pšenica", desc: "Jedna od glavnih žitarica." }, en: { name: "Wheat", desc: "One of the main cereals." } },
    { key: "corn", emoji: "🌽", bs: { name: "Kukuruz", desc: "Vrlo važna kultura." }, en: { name: "Corn", desc: "A very important crop." } },
    { key: "potato", emoji: "🥔", bs: { name: "Krompir", desc: "Tradicionalna kultura." }, en: { name: "Potato", desc: "A traditional crop." } },
    { key: "apple", emoji: "🍎", bs: { name: "Jabuka", desc: "Najzastupljenija voćka." }, en: { name: "Apple", desc: "The most widespread fruit." } },
    { key: "plum", emoji: "🍑", bs: { name: "Šljiva", desc: "Poznata kultura." }, en: { name: "Plum", desc: "A well-known crop." } },
    { key: "grapes", emoji: "🍇", bs: { name: "Grožđe", desc: "Vinogradarska regija." }, en: { name: "Grapes", desc: "Wine-growing region." } },
    { key: "raspberry", emoji: "🍓", bs: { name: "Malina", desc: "Vrlo značajna kultura." }, en: { name: "Raspberry", desc: "A very important crop." } },
    { key: "blackberry", emoji: "🫐", bs: { name: "Kupina", desc: "Koristi se za džemove." }, en: { name: "Blackberry", desc: "Used for jams." } },
  ];

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "green" }}>
        {language === "bs" ? "Poljoprivredne kulture u BiH" : "Agricultural Crops in BiH"}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cultures.map((culture, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: "#f4fff4", border: "1px solid #c8e6c9" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {culture.emoji} {culture[language].name}
                </Typography>
                <Typography gutterBottom>{culture[language].desc}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  🌱 {getRecommendation(culture.key, language)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Cultures;
