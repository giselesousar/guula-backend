const connection = require('../database/connection');

module.exports = {

    async index(request, response){

        const usuario_id = request.headers.authorization;

        const { page = 1 } = request.query;

        const [count] = await connection('receitas_usuarios').where('usuario_id', usuario_id).count();
        response.header('Total_Receitas_Favoritas', count['count(*)']);

        const receitas = await connection('receitas').where('usuario_id', usuario_id)
            .join('receitas_usuarios', 'receitas.id', '=', 'receitas_usuarios.receita_id')
            .limit(10)
            .offset((page-1)*10)
            .select([
                'receitas.*',
                'receitas_usuarios.id',
                'receitas_usuarios.usuario_id',
                'receitas_usuarios.receita_id' 
            ] );

        return response.json(receitas);
    },

    async create(request, response){
        const { receita_id } = request.body;
        const usuario_id = request.headers.authorization;
        
        const usuario = await connection('usuarios').where('id',usuario_id).select('*');
        if(!usuario.length){
            return response.status(401).json({ error: 'usuario não cadastrado' });
        }

        const [id] = await connection('receitas_usuarios').insert({
            usuario_id,
            receita_id
        })

        return response.json({ id })
    },

    async delete(request, response){
        const { id } = request.params;
        const usuario_id = request.headers.authorization;
        /*
        const receita_usuario = await connection('receitas_usuarios').where('receita_id', id).andWhere("usuario_id",usuario_id)
        .select('*');
        if(!receita_usuario.length){
            return response.status(401).json({ error: 'operation not permitted' });
        }
        */
        await connection('receitas_usuarios').where('receita_id', id).andWhere("usuario_id",usuario_id).delete();
        return response.status(204).send();
    }
}