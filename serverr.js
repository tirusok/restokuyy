const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'resto_anarus'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Get all menu items
app.get('/menu', (req, res) => {
  const query = 'SELECT * FROM menu';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching menu:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Add new menu item
app.post('/menu', (req, res) => {
  const { name, price, description } = req.body;
  const query = 'INSERT INTO menu (name, price, description) VALUES (?, ?, ?)';
  db.query(query, [name, price, description], (err, result) => {
    if (err) {
      console.error('Error adding menu item:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json({ id: result.insertId, name, price, description });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
