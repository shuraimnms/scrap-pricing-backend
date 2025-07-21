const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'prices.json');

// ✅ CORS setup to allow your frontend domain
app.use(cors({
  origin: ['https://karnatakascrap.in', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

// ✅ Root route to test if server is running
app.get('/', (req, res) => {
  res.send('✅ Scrap Pricing Backend is Live!');
});

// ✅ Get Prices
app.get('/api/prices', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read prices' });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ Update Prices
app.post('/api/prices', (req, res) => {
  const newPrices = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(newPrices, null, 2), err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save prices' });
    }
    res.json({ message: 'Prices updated successfully!' });
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
