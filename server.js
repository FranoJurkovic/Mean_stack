// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/korisnici');

// Define a schema and model for your data
const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/items', async (req, res) => {
  const item = new Item({
    name: req.body.name,
    description: req.body.description,
  });
  try {
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
