export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://oscardollman.com/api/"
    : "http://localhost:3000/api/";

export const imgRegex = /^(?!small-|medium-).*\.(jpeg|jpg|png)$/i;

export enum validCountryNames {
  India = "India",
  Singapore = "Singapore",
  Paris = "Paris",
  Berlin = "Berlin",
  UK = "UK",
  BlackAndWhite = "Black & White",
  Holland = "Holland",
}

export type image = {
  index: number;
  url: string;
  width: number;
  height: number;
  smallUrl?: string;
  mediumUrl?: string;
};

export type country = {
  name: validCountryNames;
  title: string;
  thumbnail: image;
  images: image[];
};
