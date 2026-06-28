import express from "express";
import cors from "cors";
import path from "path";
import { getGallery, getHomeImg, getProfileImg } from "./support";
import { country, image } from "../shared/api";

function createServer() {
  const app = express();
  const port = 3000;

  // Middleware
  app.use(cors());
  app.use(express.static(path.join(__dirname, "../frontend")));
  app.use(
    "/api/images",
    express.static(path.join(__dirname, "../images"), {
      immutable: true,
      maxAge: "30d",
    }),
  );

  // Data fetching
  let gallery: country[], profile: image, home: image;
  try {
    gallery = getGallery();
    console.log("Gallery loaded successfully");
    console.log(
      "Albums loaded:",
      gallery.map((album) => album.name).join(", "),
    );
  } catch (error) {
    console.error("Error loading gallery:", error);
  }

  try {
    profile = getProfileImg();
    console.log("Profile picture loaded successfully");
  } catch (error) {
    console.error("Error loading profile picture:", error);
  }

  try {
    home = getHomeImg();
    console.log("Home banner loaded successfully");
  } catch (error) {
    console.error("Error loading home banner:", error);
  }

  // Route Handlers
  const getProfile = (_req: express.Request, res: express.Response) => {
    if (profile) {
      res.json(profile);
    } else {
      res.status(500).json({ message: "Error loading profile picture" });
    }
  };

  const getHome = (_req: express.Request, res: express.Response) => {
    if (home) {
      res.json(home);
    } else {
      res.status(500).json({ message: "Error loading home banner" });
    }
  };

  const getGalleryData = (_req: express.Request, res: express.Response) => {
    if (gallery) {
      res.json(gallery);
    } else {
      res.status(500).json({ message: "Error loading gallery" });
    }
  };

  const getAlbum = (req: express.Request, res: express.Response) => {
    if (gallery) {
      const album = gallery.find(
        (country) => country.name.toString() === req.params.country,
      );
      res.json(album);
    } else {
      res.status(500).json({ message: "Error loading album" });
    }
  };

  // Routes
  app.get("/api/get-profile", getProfile);
  app.get("/api/get-home", getHome);
  app.get("/api/get-gallery", getGalleryData);
  app.get("/api/get-album/:country", getAlbum);

  // Catch-all route
  app.use((_req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${port}`);
  });

  return app;
}

createServer();
