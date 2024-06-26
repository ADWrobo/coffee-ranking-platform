const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");

require("dotenv").config();
const port = process.env.PORT || 3000;

//Use express to listen to port
app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

//configure cors
const cors = require("cors");
let corsOptions = {
  origin: ['http://localhost:4200']
}
app.use(cors(corsOptions));

//use to parse JSON bodies: JSON.parse(data)
app.use(express.json());

//Read json file
const jsonPath = path.join(__dirname, "coffee-drinks.json");

import { IRank } from '../../angular-frontend/src/app/models/IRank';

let ranks: IRank[] = [];

//parse out ranks
fs.readFile(jsonPath, function (err: any, data: any) {
  if (err) {
    console.log('Unable to read json data file: ' + jsonPath);
    console.log(jsonPath);
  } else {
    ranks = JSON.parse(data);
  }
});

// DELETE endpoint
app.delete("/ranks/:id", (req: any, res: any) => {
  if (req.params.id) {
    const rank = ranks.find((c) => c.id == req.params.id);
    if (rank) {
    var index = ranks.findIndex(function(element) {
      return element.id === rank.id;
  });
  if (index !== -1) {
      ranks.splice(index, 1);
  }
      res.status(200);
      return res.json(ranks);
    }
  }
  res.status(404);
  return res.json({ error: `Drink with id: ${req.params.id} not found.` });
});

// GET endpoint returning all ranks
app.get('/ranks', function(req: any, res: any) {
  res.status(200);
  return res.json(ranks);
});

//GET endpoint that takes in an id as a parameter and returns the rank matching that id.
app.get('/ranks/:id', (req: any, res: any) => {
  const rank = ranks.find(c => c.id == req.params.id);
  if (rank) {
    res.status(200);
    return res.json(rank);
  }
  res.status(404);
  return res.json({ error: `Rank not found.` });
});

//Create a POST(Create) endpoint that adds a new rank
app.post('/ranks', function (req: any, res: any) {
  const rank = ranks.find(c => c.id == req.body.id);
  if (rank) {
    res.status(500);
    return res.json("A rank with this id already exists.");
  }
  console.log(`body is ${JSON.stringify(req.body)}`);
  const newRank: IRank = req.body;
  //you could do a validator by including the next 2 lines in an if statement such as if(newPerson.firstname && newPerson.lastname)
  ranks.push(newRank);
  res.status(200);
  return res.json("Coffee Rank added successfully.");
});

// PUT endpoint to update an existing rank
app.put('/ranks/:id', (req: any, res: any) => {
  const rank = ranks.find(c => c.id == req.params.id);
  if (!rank) {
    res.status(404);
    return res.json({ error: `Rank with id: ${req.params.id} not found.` });
  }

  const updatedRank: IRank = req.body;
  ranks = ranks.map(c => c.id == req.params.id ? updatedRank : c);

  res.status(200);
  return res.json("Coffee Rank updated successfully.");
});
