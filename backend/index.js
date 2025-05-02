const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/job'));
app.use('/api/users', userRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to JobMatch API' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
