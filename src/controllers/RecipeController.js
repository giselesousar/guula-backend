const crypto = require('crypto');
const connection = require ('../database/connection');


module.exports = {
    async create(request, response) { 
        const { titulo, ingredientes, modo_preparo, tempo_preparo, rendimento,categoria,imagem} = request.body; 

        await connection('receitas').insert({
          titulo,
          ingredientes, 
          modo_preparo, 
          tempo_preparo, 
          rendimento,
          categoria,
          imagem
        })
    
        return response.json({ titulo });
      },

      async index(request, response) {
        const usuarios = await connection('receitas').select('*');
        const [count] = await connection('receitas').count();
        
        response.header("Total_Receitas",count["count(*)"])
        return response.json(usuarios);
      },
	  
	    async recibe_by_category(request, response) {
        var { categoria} = request.body;
        const usuarios = await connection('receitas').where("categoria","=",categoria).select('*');
        const [count] = await connection('receitas').where("categoria","=",categoria).count();

        response.header("Total_Receitas_by_Cetegoria",count["count(*)"])
        return response.json(usuarios);
      },

      async recibe_by_ingredients(request, response) {
        var { ingredientes} = request.body;
        
        var lista_ingredientes = ingredientes.split(" ");

        var query = "SELECT * FROM receitas WHERE ingredientes LIKE "+"'%"+lista_ingredientes[0]+"%'";

        for(var i = 1; i < lista_ingredientes.length; i++){
          query += " and ingredientes LIKE "+"'%"+lista_ingredientes[i]+"%'"
        }
        console.log(query);

        var receitas_encontradas = await connection.raw(query);
        var count = Object.keys(receitas_encontradas).length;
        
        response.header("Total_Receitas_by_Ingredientes",count)
        return response.json(receitas_encontradas);

      }
}