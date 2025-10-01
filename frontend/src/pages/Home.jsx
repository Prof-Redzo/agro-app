import { Typography, Box, List, ListItem } from "@mui/material";

const facts = {
  bs: [
    "🌽 Kukuruz je jedna od najrasprostranjenijih kultura na svijetu.",
    "🐝 Više od 75% svjetskih usjeva zavisi od oprašivanja pčela.",
    "🍎 Najveći proizvođač jabuka na svijetu je Kina.",
    "🥔 Krompir je prvi put uzgojen u Južnoj Americi prije više od 7.000 godina.",
    "💧 Za proizvodnju 1 kg pšenice potrebno je oko 1.500 litara vode.",
    "🌱 Organska poljoprivreda koristi prirodne metode bez hemijskih pesticida.",
    "🚜 Traktori su revolucionirali poljoprivredu početkom 20. stoljeća.",
  ],
  en: [
    "🌽 Corn is one of the most widespread crops in the world.",
    "🐝 More than 75% of global crops depend on bee pollination.",
    "🍎 The largest apple producer in the world is China.",
    "🥔 Potatoes were first cultivated in South America over 7,000 years ago.",
    "💧 Producing 1 kg of wheat requires about 1,500 liters of water.",
    "🌱 Organic farming uses natural methods without chemical pesticides.",
    "🚜 Tractors revolutionized agriculture at the beginning of the 20th century.",
  ],
};

function Home({ language, username }) {
  return (
    <Box>
      <Typography variant="h4" align="center" color="green" gutterBottom>
        {username
          ? language === "bs"
            ? `Dobrodošao, ${username} 🌱`
            : `Welcome, ${username} 🌱`
          : language === "bs"
          ? "Dobrodošli u aplikaciju za poljoprivredu 🌱"
          : "Welcome to the Agriculture App 🌱"}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        {language === "bs" ? "Zanimljivosti iz poljoprivrede" : "Agriculture Facts"}
      </Typography>
      <List>
        {facts[language].map((fact, index) => (
          <ListItem key={index}>👉 {fact}</ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Home;
