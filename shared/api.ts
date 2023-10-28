export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://oscardollman.com/api/"
    : "http://localhost:3000/api/";

export const imgRegex = /\.(jpeg|jpg|png)$/i;

export enum validCountryNames {
  india,
  singapore,
  mumbai,
  paris,
}

export type image = {
  index: number;
  url: string;
};

export type country = {
  name: validCountryNames;
  title: string;
  thumbnail: image;
  images: image[];
};
