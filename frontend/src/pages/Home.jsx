import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";

export default function Home({ user, language }) {
  const translations = {
    en: {
      welcome: `Welcome, ${user?.name || "Guest"} 🌱`,
      funFact: "Today's Fun Fact",
      factsTitle: "Agriculture Facts",
      facts: [
        "🌽 Corn is one of the most widespread crops in the world.",
        "🐝 More than 75% of global crops depend on bee pollination.",
        "🍎 The largest apple producer in the world is China.",
        "🥔 Potatoes were first cultivated in South America over 7,000 years ago.",
        "💧 Producing 1 kg of wheat requires about 1,500 liters of water.",
        "🌱 Organic farming uses natural methods without chemical pesticides.",
        "🚜 Tractors revolutionized agriculture at the beginning of the 20th century.",
      ],
      fun: "🌾 Did you know? Agriculture provides employment to over 1 billion people worldwide!",
    },
    bs: {
      welcome: `Dobrodošao, ${user?.name || "Gost"} 🌱`,
      funFact: "Današnja zanimljivost",
      factsTitle: "Zanimljivosti o poljoprivredi",
      facts: [
        "🌽 Kukuruz je jedna od najrasprostranjenijih kultura na svijetu.",
        "🐝 Više od 75% svjetskih usjeva ovisi o oprašivanju pčela.",
        "🍎 Najveći proizvođač jabuka na svijetu je Kina.",
        "🥔 Krompir se prvi put uzgajao u Južnoj Americi prije više od 7.000 godina.",
        "💧 Za proizvodnju 1 kg pšenice potrebno je oko 1.500 litara vode.",
        "🌱 Organska poljoprivreda koristi prirodne metode bez hemijskih pesticida.",
        "🚜 Traktori su revolucionirali poljoprivredu početkom 20. stoljeća.",
      ],
      fun: "🌾 Da li znaš? Poljoprivreda zapošljava više od milijardu ljudi širom svijeta!",
    },
  };

  const t = translations[language || "bs"];

  return (
    <Container maxWidth="md" sx={{ mt: 6, textAlign: "center" }}>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          {t.welcome}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Card
          sx={{
            background: "linear-gradient(135deg, #A8E6CF, #DCEDC1)",
            color: "#2E7D32",
            mb: 5,
            boxShadow: 3,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {t.funFact}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {t.fun}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {t.factsTitle}
      </Typography>

      <Grid container spacing={3}>
        {t.facts.map((fact, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  boxShadow: 2,
                  "&:hover": { boxShadow: 5, transform: "scale(1.03)" },
                  transition: "all 0.3s ease",
                }}
              >
                <CardContent>
                  <Typography variant="body1">{fact}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }} />
    </Container>
  );
}
