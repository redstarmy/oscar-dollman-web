import express from "express";
import cors from "cors";
import path from "path";
import { cleanUp, getGallery, getProfileImg } from "./support";

const app = express();
const port = 3000;

app.use(cors());

const gallery = getGallery();
const profileImg = getProfileImg()

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/images", express.static(path.join(__dirname, "../images")));

app.get("/api/get-profile", (_req, res) => {
  res.json(profileImg);
});

app.get("/api/get-gallery", (_req, res) => {
  res.json(gallery);
});

app.get("/api/get-album/:country", (req, res) => {
  res.json(
    gallery.find((country) => country.name.toString() == req.params.country),
  );
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function handleCleanUp() {
  console.log("\nCleaning up..");
  cleanUp();
  process.exit(0);
}

process.on("SIGINT", handleCleanUp);
process.on("SIGTERM", handleCleanUp);
process.on("SIGQUIT", handleCleanUp);
