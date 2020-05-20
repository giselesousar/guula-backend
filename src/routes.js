const express = require('express');

const UserController = require('./controllers/UserController');
const FavoritesController = require('./controllers/FavoritesController');
const RecipesController = require('./controllers/RecipesController');

const {celebrate,Segments,Joi} = require('celebrate') 

const routes = express.Router(); 

routes.get('/favorites', FavoritesController.index);
routes.post('/favorites', FavoritesController.create);
routes.delete('/favorites/:id', FavoritesController.delete);
routes.get('/users', UserController.index);

routes.post("/users/login",celebrate({

    [Segments.BODY] : Joi.object().keys({
        email_p:Joi.string().required().email(),
        senha_p:Joi.string().required()
    })} 
    ),UserController.login);

routes.post("/users",celebrate({

    [Segments.BODY] : Joi.object().keys({
        nome:Joi.string().required(),
        email_p:Joi.string().required().email(),
        senha_p:Joi.string().required()
    })} 
    ),UserController.create); 

routes.post('/recipes', RecipesController.create);
routes.get('/recipes/ingrediente', RecipesController.searchIngr);
routes.get('/recipes/:categoria', RecipesController.searchCat);

module.exports = routes; //exportando as rotas