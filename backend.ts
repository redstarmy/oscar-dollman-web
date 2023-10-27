import type { country } from './src/api/api'
import { image, imgRegex, validCountryNames } from './src/api/api'
const express = require('express')
const cors = require('cors')
const path = require('path')
const { readdirSync } = require('fs')
const app = express()
const port = 3000

app.use(cors())

const imagePath = path.join(__dirname, 'images')

getGallery()

app.use(express.static(path.join(__dirname, 'dist')))

app.use('/api/images', express.static(path.join(__dirname, 'images')))

app.get('/api/get-img', (req, res) => {
  res.json(getGallery())
})

app.get('/api/get-album/:country', (req, res) => {
  res.json(getCountry(req.params.country))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`)
})

function getImageUrls(country: validCountryNames) {
  return readdirSync(path.join(imagePath, country.toString())).sort()
    .filter((img: string) => imgRegex.test(img))
    .map((img: string, idx: number) => ({
        url: path.join('images', country.toString(), img),
        index: idx
      }) as image
    )
}


function getGallery() {
  return readdirSync(imagePath)
    .filter((dir: string) => dir in validCountryNames)
    .sort()
    .map(
      (countryName: validCountryNames) =>
        ({
          name: countryName,
          title: countryName.toString(),
          thumbnail: getImageUrls(countryName).at(0),
          images: getImageUrls(countryName)
        }) as country
    )
}

function getCountry(countryName){
  const gallery = getGallery()
  return gallery.find((country) => country.name==countryName)
}
