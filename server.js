const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'prices.json');

app.use(cors());
app.use(bodyParser.json());

// Route to get prices
app.get('/api/prices', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read prices' });
    }
    res.json(JSON.parse(data));
  });
});

// Route to update prices
app.post('/api/prices', (req, res) => {
  const newPrices = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(newPrices, null, 2), err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save prices' });
    }
    res.json({ message: 'Prices updated successfully!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
