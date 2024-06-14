const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bookRoutes = require('./routes/book.js');
const userRoutes = require('./routes/user.js');
require('dotenv').config();

mongoose.connect(process.env.MONGO,
  {   useNewUrlParser: true,
      useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app
  .use(express.json())
  .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });
  
  //Routes
  app.use('/api/books', bookRoutes);
  app.use('/api/auth', userRoutes);
  app.use('/images', express.static('images'));
  
  module.exports = app;