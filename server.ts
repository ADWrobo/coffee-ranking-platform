const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const fs = require("fs");

//configure cors
const cors = require("cors");
let corsOptions = {
  origin: ['http://localhost:4200']
}
app.use(cors(corsOptions));

// Serve the Angular app
//app.use(express.static(path.join(__dirname, 'src')));

//use to parse JSON bodies: JSON.parse(data)
app.use(express.json());

//Read json file
const jsonPath = path.join(__dirname, "coffee-drinks.json");

import { IRank } from './src/app/models/IRank';

let ranks: IRank[] = [];

//parse out ranks
fs.readFile(jsonPath, function (err: any, data: any) {
  if (err) {
    console.log('Unable to read json data file: ' + jsonPath);
  } else {
    ranks = JSON.parse(data);
  }
});

//Use express to listen to port
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// GET endpoint returning all ranks
app.get('/ranks', function(req: any, res: any) {
  res.status(200);
  return res.json(ranks);
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'src', 'index.html'));
// });

