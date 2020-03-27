const express = require('express');
const nunjucks = require('nunjucks');
const sqlite3 = require('sqlite3').verbose();
const app = express();

const path = require('path');
const dbPath = path.resolve(__dirname, 'db', 'doesangue.db');

const db = new sqlite3.Database(dbPath);

// Criando tabela no SQlite assim que sobre o servidor.
require('./config/created-table')(db);

// Configurar o servidor para apresentar arquivos estáticos.
app.use(express.static('public'));

// Habilita o express para receber requisições do tipo urlencoded.
app.use(express.urlencoded({ extended: true }));

// Configurando o template engine.
nunjucks.configure('./', {
  express: app,
  noCache: true
});

require('./routes')(app, db);

app.listen(3333, () => {
  console.log('Servidor no ar!');
});
