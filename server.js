const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'prices.json');

// ✅ Serve frontend from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// ✅ CORS setup for API (optional if serving same domain)
app.use(cors());

// ✅ Body parser
app.use(bodyParser.json());

// ✅ Root route (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API - Get Prices
app.get('/api/prices', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read prices' });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ API - Update Prices
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
