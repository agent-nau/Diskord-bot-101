import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Simple health check route
app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`🌐 Web service listening on port ${PORT}`);
});