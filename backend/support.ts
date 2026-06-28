import fs from "fs";
import path from "path";
import imageSize from "image-size";
import { country, image, imgRegex, validCountryNames } from "../shared/api";
import { ISizeCalculationResult } from "image-size/dist/types/interface";

const imagePath = path.join(__dirname, "../images");

function getDimensionsFromRelativePath(
  relativePath: string,
): ISizeCalculationResult {
  const absolutePath = path.join(__dirname, "../", relativePath);
  const fileBuffer = fs.readFileSync(absolutePath);
  return normalizeDimensionsForDisplay(imageSize(fileBuffer));
}

function normalizeDimensionsForDisplay(
  dimensions: ISizeCalculationResult,
): ISizeCalculationResult {
  if (
    dimensions.orientation &&
    dimensions.orientation >= 5 &&
    dimensions.orientation <= 8
  ) {
    return {
      ...dimensions,
      width: dimensions.height,
      height: dimensions.width,
    };
  }

  return dimensions;
}

export function getProfileImg(): image {
  try {
    const profilePath = path.join("images", "Profile", "profile.jpeg");
    const dimensions = getDimensionsFromRelativePath(profilePath);
    return {
      url: profilePath,
      height: dimensions.height,
      width: dimensions.width,
      index: 0,
    } as image;
  } catch (error) {
    console.error("Error loading profile image:", error);
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

        const dimensions = getDimensionsFromRelativePath(url);

        return {
          url,
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
