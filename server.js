const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 3000;
const connectDB = require('./config/dbConnection');

connectDB();
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.use(express.json());
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);