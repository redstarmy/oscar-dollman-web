import express from "express";
import cors from "cors";
import path from "path";
import { cleanUp, getGallery, getHomeImg, getProfileImg } from "./support";

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/api/images", express.static(path.join(__dirname, "../images")));

// Data fetching
const gallery = getGallery();
const profile = getProfileImg();
const home = getHomeImg();

// Routes
app.get("/api/get-profile", (_req, res) => {
  res.json(profile);
});

app.get("/api/get-home", (_req, res) => {
  res.json(home);
});

app.get("/api/get-gallery", (_req, res) => {
  res.json(gallery);
});

app.get("/api/get-album/:country", (req, res) => {
  const album = gallery.find(
    (country) => country.name.toString() === req.params.country,
  );
  res.json(album);
});

// Catch-all route
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Server listener
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Cleanup function
function handleCleanUp() {
  console.log("\nCleaning up..");
  cleanUp();
  process.exit(0);
}

process.on("SIGINT", handleCleanUp);
process.on("SIGTERM", handleCleanUp);
process.on("SIGQUIT", handleCleanUp);
