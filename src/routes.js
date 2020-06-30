const express = require('express');

const UserController = require('./controllers/UserController');
const RecipeController = require('./controllers/RecipeController');
const FavoritesController = require('./controllers/FavoritesController');

const {celebrate,Segments,Joi} = require('celebrate') 

const routes = express.Router(); 

routes.get('/favorites',celebrate({
    [Segments.QUERY]:{
        page: Joi.number().required()
    },
    [Segments.HEADERS] : Joi.object({authorization: Joi.string().required(),}).unknown()

}),FavoritesController.index);

routes.post('/favorites',celebrate({
    
    [Segments.HEADERS] : Joi.object({authorization: Joi.string().required()}).unknown(),

    [Segments.BODY] : Joi.object().keys({receita_id:Joi.number().required()})

}) ,FavoritesController.create);    

routes.delete('/favorites/:id', celebrate({
    [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), FavoritesController.delete);


routes.get('/users', UserController.index);

routes.get('/users/:email', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        email: Joi.string().required().email(),
    })
}), UserController.getUserByEmail);

routes.post('/users/password',celebrate({
    
    [Segments.BODY] : Joi.object().keys({email_p: Joi.string().required().email(), senha_p:Joi.string().required()})

}) ,UserController.changePassword);  

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

routes.get('/recipes', celebrate({
        [Segments.QUERY]:{
            page: Joi.number().required()
        }
}), RecipeController.index);

routes.get('/recipes/category',celebrate({
    [Segments.BODY] : Joi.object().keys({
        categoria:Joi.string().required()
    })}
    ),RecipeController.recipe_by_category);
	

routes.get('/recipes/ingredientes',RecipeController.recipe_by_ingredients); 

routes.get('/recipes/random/:quant',celebrate({
        [Segments.PARAMS] : Joi.object().keys({
            quant:Joi.number().required(),
        })}), RecipeController.recipe_random);

routes.get('/recipes/ids/:ids', celebrate({
    [Segments.PARAMS] : Joi.object().keys({
        ids: Joi.string().required(),
    }) 
}), RecipeController.recipe_ids)

module.exports = routes; //exportando as rotas