import express from "express";
import cors from "cors";
import path from "path";
import {
  cleanUp,
  getGallery,
  getHomeImg,
  getProfileImg,
  loadSourceCounts,
  saveSourceCounts,
} from "./support";

function createServer() {
  const app = express();
  const port = 3000;

  // Middleware
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../frontend")));
  app.use("/api/images", express.static(path.join(__dirname, "../images")));
  app.use(express.json()); // Parse JSON bodies

  // Data fetching
  const gallery = getGallery();
  const profile = getProfileImg();
  const home = getHomeImg();

  let sourceCounts: { [key: string]: number } = loadSourceCounts();

  // Route Handlers
  const getProfile = (_req: express.Request, res: express.Response) => {
    res.json(profile);
  };

  const getHome = (_req: express.Request, res: express.Response) => {
    res.json(home);
  };

  const getGalleryData = (_req: express.Request, res: express.Response) => {
    res.json(gallery);
  };

  const getAlbum = (req: express.Request, res: express.Response) => {
    const album = gallery.find(
      (country) => country.name.toString() === req.params.country
    );
    res.json(album);
  };

  const trackSource = (req: express.Request, res: express.Response) => {
    const { source } = req.body;
    if (source) {
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
      saveSourceCounts(sourceCounts);
      res.status(200).json({ message: "Source tracked successfully" });
    } else {
      res.status(400).json({ message: "Missing source parameter" });
    }
  };

  // Routes
  app.get("/api/get-profile", getProfile);
  app.get("/api/get-home", getHome);
  app.get("/api/get-gallery", getGalleryData);
  app.get("/api/get-album/:country", getAlbum);
  app.post("/api/track-source", trackSource);

  // Catch-all route
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  return app;
}

function handleCleanUp() {
  console.log("\nCleaning up...");
  cleanUp();
  process.exit(0);
}

process.on("SIGINT", handleCleanUp);
process.on("SIGTERM", handleCleanUp);
process.on("SIGQUIT", handleCleanUp);

createServer();
