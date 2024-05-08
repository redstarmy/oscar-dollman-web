import { country, image, imgRegex, validCountryNames } from "../shared/api";
import fs from "fs";
import path from "path";
import imageSize from "image-size";
import sharp from "sharp";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

const imagePath = path.join(__dirname, "../images");

export function getProfileImg(){
  return {url: path.join("images", "Profile","/profile.jpeg")}
}

export function getGallery() {
  return fs
    .readdirSync(imagePath)
    .filter((dir) => dir in validCountryNames)
    .map((countryName) => countryName as unknown as validCountryNames)
    .map((countryName) => {
      const images = getImages(countryName);
      return {
        name: countryName,
        title: countryName.toString().replace(/_/g, " "),
        thumbnail: images.at(0),
        images: images,
      } as country;
    });
}

export function cleanUp() {
  return fs
    .readdirSync(imagePath)
    .filter((dir) => dir in validCountryNames)
    .map((countryName) => countryName as unknown as validCountryNames)
    .map((countryName) => {
      fs.readdirSync(path.join(imagePath, countryName.toString()))
        .filter((img: string) => !imgRegex.test(img))
        .forEach((img) =>
          fs.unlinkSync(path.join(imagePath, countryName.toString(), img)),
        );
    });
}

function getImages(countryName: validCountryNames) {
  return fs
    .readdirSync(path.join(imagePath, countryName.toString()))
    .filter((img: string) => imgRegex.test(img))
    .map((img: string, idx: number) => {
      const url = path.join("images", countryName.toString(), img);
      const smallUrl = path.join(
        "images",
        countryName.toString(),
        "small-" + img,
      );
      const mediumUrl = path.join(
        "images",
        countryName.toString(),
        "medium-" + img,
      );
      const dimensions = imageSize(path.join(__dirname, "../", url));
      resizeImage(countryName.toString(), img, dimensions);
      return {
        url: url,
        smallUrl: smallUrl,
        mediumUrl: mediumUrl,
        index: idx,
        width: dimensions.width,
        height: dimensions.height,
      } as image;
    });
}

function resizeImage(
  countryName: string,
  imgName: string,
  dim: ISizeCalculationResult,
) {
  const smallUrl = path.join(imagePath, countryName, "small-" + imgName);
  const mediumUrl = path.join(imagePath, countryName, "medium-" + imgName);

  sharp(path.join(imagePath, countryName, imgName))
    .resize(Math.floor(dim.width! / 4), Math.floor(dim.height! / 4), {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(smallUrl)
    .catch((err) => console.log("Sharp exited with Error: " + err));

  sharp(path.join(imagePath, countryName, imgName))
    .resize(Math.floor(dim.width! / 2), Math.floor(dim.height! / 2), {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(mediumUrl)
    .catch((err) => console.log("Sharp exited with Error: " + err));
}
