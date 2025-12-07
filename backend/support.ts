import fs from "fs";
import path from "path";
import imageSize from "image-size";
import sharp from "sharp";
import { country, image, imgRegex, validCountryNames } from "../shared/api";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

const imagePath = path.join(__dirname, "../images");

function getDimensionsFromRelativePath(relativePath: string): ISizeCalculationResult {
  const absolutePath = path.join(__dirname, "../", relativePath);
  const fileBuffer = fs.readFileSync(absolutePath);
  return imageSize(fileBuffer);
}

export function getProfileImg(): image {
  try {
    const profilePath = path.join("images", "Profile", "profile.jpeg");
    const dimensions = getDimensionsFromRelativePath(profilePath); // ⬅ changed
    return {
      url: profilePath,
      mediumUrl: profilePath,
      smallUrl: profilePath,
      height: dimensions.height,
      width: dimensions.width,
      index: 0,
    } as image;
  } catch (error) {
    console.error("Error loading profile image:", error);
    throw error;
  }
}

export function getHomeImg(): image {
  try {
    const homePath = path.join("images", "Home", "home.jpeg");
    const dimensions = getDimensionsFromRelativePath(homePath); // ⬅ changed
    return {
      url: homePath,
      mediumUrl: homePath,
      smallUrl: homePath,
      height: dimensions.height,
      width: dimensions.width,
      index: 0,
    } as image;
  } catch (error) {
    console.error("Error loading home image:", error);
    throw error;
  }
}

export function getGallery(): country[] {
  try {
    const countries = validCountryDirectories().map((countryName) => {
      const images = getImages(countryName);
      return {
        name: countryName,
        title: validCountryNames[countryName as keyof typeof validCountryNames],
        thumbnail: images[0],
        images,
      } as country;
    });
    return countries;
  } catch (error) {
    console.error("Error loading gallery:", error);
    throw error;
  }
}

export function cleanUp() {
  validCountryDirectories().forEach((countryName) => {
    const countryPath = path.join(imagePath, countryName.toString());
    fs.readdirSync(countryPath)
      .filter((img) => !imgRegex.test(img))
      .forEach((img) => fs.unlinkSync(path.join(countryPath, img)));
  });
}

function validCountryDirectories(): validCountryNames[] {
  return fs
    .readdirSync(imagePath)
    .filter((dir) => dir in validCountryNames)
    .map((dir) => dir as unknown as validCountryNames);
}

function getImages(countryName: validCountryNames): image[] {
  try {
    const countryPath = path.join(imagePath, countryName.toString());
    return fs
      .readdirSync(countryPath)
      .filter((img) => imgRegex.test(img))
      .map((img, idx) => {
        const url = path.join("images", countryName.toString(), img);
        const smallUrl = path.join(
          "images",
          countryName.toString(),
          `small-${img}`,
        );
        const mediumUrl = path.join(
          "images",
          countryName.toString(),
          `medium-${img}`,
        );

        // ⬇ changed: use helper instead of imageSize(path.join(...))
        const dimensions = getDimensionsFromRelativePath(url);

        resizeImage(countryName.toString(), img, dimensions);
        return {
          url,
          smallUrl,
          mediumUrl,
          index: idx,
          width: dimensions.width,
          height: dimensions.height,
        } as image;
      });
  } catch (error) {
    console.error(`Error loading images for country: ${countryName}`, error);
    throw error;
  }
}


function resizeImage(
  countryName: string,
  imgName: string,
  dim: ISizeCalculationResult,
) {
  const countryPath = path.join(imagePath, countryName);
  const smallUrl = path.join(countryPath, `small-${imgName}`);
  const mediumUrl = path.join(countryPath, `medium-${imgName}`);

  sharp(path.join(countryPath, imgName))
    .resize(Math.floor(dim.width! / 4), Math.floor(dim.height! / 4), {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(smallUrl)
    .catch((err) => console.log(`Sharp exited with Error: ${err}`));

  sharp(path.join(countryPath, imgName))
    .resize(Math.floor(dim.width! / 2), Math.floor(dim.height! / 2), {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(mediumUrl)
    .catch((err) => console.log(`Sharp exited with Error: ${err}`));
}

const sourceCountsFilePath = path.join(
  __dirname,
  "../images/source_counts.json",
);

export const loadSourceCounts = (): { [key: string]: number } => {
  try {
    const data = fs.readFileSync(sourceCountsFilePath);
    return JSON.parse(data.toString());
  } catch (err) {
    return {};
  }
};

export const saveSourceCounts = (sourceCounts: { [key: string]: number }) => {
  try {
    fs.writeFileSync(
      sourceCountsFilePath,
      JSON.stringify(sourceCounts, null, 2),
    );
  } catch (err) {
    console.error("Error saving source counts:", err);
  }
};
