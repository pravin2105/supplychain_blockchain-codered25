const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',     // Replace with your MySQL host
  user: 'root',          // Replace with your MySQL user
  password: 'Avimohana.04',          // Replace with your MySQL password
  database: 'supplier_materials_db' // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API to fetch all materials
app.get('/materials', (req, res) => {
  const query = 'SELECT * FROM materials';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching materials:', err);
      res.status(500).send('Error fetching materials');
    } else {
      res.json(results);
    }
  });
});

// API to add a new material
app.post('/materials', (req, res) => {
  const { name, type, quantity, price, description, image } = req.body;
  const query = 'INSERT INTO materials (name, type, quantity, price, description, image) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [name, type, quantity, price, description, image], (err, result) => {
    if (err) {
      console.error('Error adding material:', err);
      res.status(500).send('Error adding material');
    } else {
      res.status(201).send('Material added successfully');
    }
  });
});

// API to delete a material by ID
app.delete('/materials/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM materials WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting material:', err);
      res.status(500).send('Error deleting material');
    } else {
      res.send('Material deleted successfully');
    }
  });
});

// ------------------------------
// Warehouse Stock APIs
// ------------------------------

// API to fetch all warehouse stock
app.get('/warehouse-stock', (req, res) => {
  const query = 'SELECT * FROM warehouse_stock';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching warehouse stock:', err);
      res.status(500).send('Error fetching warehouse stock');
    } else {
      res.json(results);
    }
  });
});

// API to add a new product to the warehouse stock
app.post('/warehouse-stock', (req, res) => {
  const { product, quantity, description } = req.body;
  const dateAdded = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  const query = 'INSERT INTO warehouse_stock (product, quantity, date_added, description) VALUES (?, ?, ?, ?)';
  db.query(query, [product, quantity, dateAdded, description], (err, result) => {
    if (err) {
      console.error('Error adding product to warehouse stock:', err);
      res.status(500).send('Error adding product to warehouse stock');
    } else {
      res.status(201).send('Product added to warehouse stock successfully');
    }
  });
});

// API to delete a product from warehouse stock by ID
app.delete('/warehouse-stock/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM warehouse_stock WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product from warehouse stock:', err);
      res.status(500).send('Error deleting product from warehouse stock');
    } else {
      res.send('Product deleted from warehouse stock successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
