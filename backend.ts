const express = require('express');
const cors = require('cors');
const path = require('path');
const {readdirSync, statSync} = require("fs");
const app = express();
const port = 3000;

app.use(cors());

const countries = ["india", "singapore"]
const imagePath = path.join(__dirname, 'images');

const getCountries = () => readdirSync(imagePath).filter(file => statSync(path.join(imagePath, file)).isDirectory())

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/images', express.static(path.join(__dirname, 'images')));

app.get('/api/get-dirs', (req, res) => {
  res.json({ countries: getCountries().filter(country => countries.includes(country)) });
});

app.get('/api/:country/get-images', (req, res) => {
  const imageUrls = readdirSync(path.join(__dirname, "/images/" + req.params.country)).filter(file => /\.jpeg$/i.test(file)).map(img =>"images/"+req.params.country + "/" + img)
  res.json({ images: imageUrls });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0',() => {
  console.log(`Server listening at http://localhost:${port}`);
});
