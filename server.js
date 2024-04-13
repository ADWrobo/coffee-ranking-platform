const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve the Angular app
app.use(express.static(path.join(__dirname, 'src')));

//use to parse JSON bodies: JSON.parse(data)
app.use(express.json());

// Handle API requests
app.get('/api/hello', (req, res) => {
  res.send('Hello from Express.js!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});