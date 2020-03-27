const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const path = require('path');
const dbPath = path.resolve(__dirname, 'db', 'doesangue.db');

let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(dbPath);

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

app.get('/', (req, res) => {
  const sql = `SELECT * FROM Donors`;
  db.all(sql, [], (error, result) => {
    if (error) return res.send(error.message);
    const donors = result;
    return res.render('index.html', { donors });
  });
});

app.post('/', (req, res) => {
  const { name, email, blood } = req.body;

  const sql = `INSERT INTO Donors (name, email, blood) VALUES ($1, $2, $3);`;
  db.run(sql, [name, email, blood], error => {
    if (error) return res.send(error.message);
    return res.redirect('/');
  });
});

app.listen(3333, () => {
  console.log('Servidor no ar!');
});
