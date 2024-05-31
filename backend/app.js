const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://pierremarotpro:c6v9XGhJHm16TP2Z@cluster0.wiir3bn.mongodb.net/',
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



/*
mongoose.connect(`mongodb+srv://UTILISATEUR_MONGO:${password}@leserveur.nnybhep.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));
*/

//installer Dotenv (créer des fichier .env (sans nom)) pour remplacer le mdp par un fichier securisé lu par react