import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { country, image, imgRegex, validCountryNames } from "../shared/api";

const app = express();
const port = 3000;

app.use(cors());

const imagePath = path.join(__dirname, "images");

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/images", express.static(path.join(__dirname, "images")));

app.get("/api/get-img", (req, res) => {
  res.json(getGallery());
});

app.get("/api/get-album/:country", (req, res) => {
  res.json(getCountry(req.params.country));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening at http://localhost:${port}`);
});

function getImageUrls(country: validCountryNames) {
  return fs
    .readdirSync(path.join(imagePath, country.toString()))
    .sort((a, b) => a.localeCompare(b))
    .filter((img: string) => imgRegex.test(img))
    .map(
      (img: string, idx: number) =>
        ({
          url: path.join("images", country.toString(), img),
          index: idx,
        }) as image,
    );
}

function getGallery() {
  return fs
    .readdirSync(imagePath)
    .filter((dir) => dir in validCountryNames)
    .sort((a, b) => a.localeCompare(b))
    .map((countryName) => countryName as unknown as validCountryNames)
    .map((countryName) => {
      return {
        name: countryName,
        title: countryName.toString(),
        thumbnail: getImageUrls(countryName).at(0),
        images: getImageUrls(countryName),
      } as country;
    });
}

function getCountry(countryName: string) {
  return getGallery().find((country) => country.name.toString() == countryName);
}
