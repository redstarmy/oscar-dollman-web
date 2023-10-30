import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { country, image, imgRegex, validCountryNames } from "../shared/api";
import imageSize from "image-size";

const app = express();
const port = 3000;

app.use(cors());

const imagePath = path.join(__dirname, "../images");

const gallery = getGallery();

app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/api/images", express.static(path.join(__dirname, "../images")));

app.get("/api/get-gallery", (req, res) => {
  res.json(gallery);
});

app.get("/api/get-album/:country", (req, res) => {
  res.json(
    gallery.find((country) => country.name.toString() == req.params.country),
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function getImages(countryName: validCountryNames) {
  return fs
    .readdirSync(path.join(imagePath, countryName.toString()))
    .filter((img: string) => imgRegex.test(img))
    .map((img: string, idx: number) => {
      const url = path.join("images", countryName.toString(), img);
      const dimensions = imageSize(path.join(__dirname, "../", url));
      return {
        url: url,
        index: idx,
        width: dimensions.width,
        height: dimensions.height,
      } as image;
    });
}

function getGallery() {
  return fs
    .readdirSync(imagePath)
    .filter((dir) => dir in validCountryNames)
    .map((countryName) => countryName as unknown as validCountryNames)
    .map((countryName) => {
      const images = getImages(countryName);
      return {
        name: countryName,
        title: countryName.toString(),
        thumbnail: images.at(0),
        images: images,
      } as country;
    });
}
