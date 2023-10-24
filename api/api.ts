export type country = {
  title: string
  images: string[]
}
export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://oscardollman.com/api/' : 'http://localhost:3000/api/';
