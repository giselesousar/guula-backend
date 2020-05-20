const connection = require('../database/connection');

module.exports = {

    async create(request, response){
        const {titulo, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, imagem} = request.body;

        const receita = await connection('receitas').insert({
            titulo,
            ingredientes,
            modo_preparo,
            tempo_preparo,
            rendimento,
            categoria,
            imagem
        })

        return response.json(receita);
    },

    async searchIngr(request, response){
        const { ingredientes } = request.body;
        
        const receitas = await connection('receitas').where('ingredientes', ingredientes).select('*');

        return response.json(receitas);
    },

    async searchCat(request, response){
        const { categoria } = request.body;
        const receitas = await connection('receitas').where('categoria', categoria).count();

        return response.json(receitas);
    }
}