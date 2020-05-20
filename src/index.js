const express = require('express');

const cors = require('cors');

const routes = require('./routes');//importando as rotas

const app = express();//criando a aplicação

var porta = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(porta);//porta 

