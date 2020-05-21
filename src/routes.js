const express = require('express');

const UserController = require('./controllers/UserController');
const RecipeController = require('./controllers/RecipeController');
const FavoritesController = require('./controllers/FavoritesController');

const {celebrate,Segments,Joi} = require('celebrate') 

const routes = express.Router(); 

// FavoritesController:
routes.get('/favorites', FavoritesController.index);

routes.post('/favorites',celebrate({

    [Segments.BODY] : Joi.objetc().keys({
        usuario_id:Joi.string().required(),
        receita_id:Joi.string().required()
    })}
    ),FavoritesController.create);

routes.delete('/favorites/:id',celebrate({
    
    [Segments.BODY] : Joi.object().keys({
        id:Joi.int().required()
    })}
    ),FavoritesController.delete);

// UsersController:
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

// RecipeController:
routes.get('/recipes', RecipeController.index);

routes.post('/recipes',celebrate({

    [Segments.BODY] : Joi.object().keys({
        titulo:Joi.string().required(),
        categoria:Joi.string().required(),
        tempo_preparo:Joi.string().required(),
        rendimento:Joi.string().required(),
        ingredientes:Joi.string().required(),
        modo_preparo:Joi.string().required(),
        imagem:Joi.string().required()
    })}
    ),RecipeController.create);

routes.get('/recipes/ingredients',celebrate({

    [Segments.BODY] : Joi.object().keys({
        ingredientes:Joi.string().required()
    })}
    ),RecipeController.recibe_by_ingredients);

routes.get('/recipes/category',celebrate({

    [Segments.BODY] : Joi.object().keys({
        categoria:Joi.string().required()
    })}
    ),RecipeController.recibe_by_category);

module.exports = routes; //exportando as rotas