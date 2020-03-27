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

let donors = [];

app.get('/', (req, res) => {
  donors = [];
  const sql = `SELECT * FROM Donors`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    rows.forEach(donor => {
      donors.push(donor);
    });
    res.render('index.html', { donors });
  });
});

app.post('/', (req, res) => {
  const { name, email, blood } = req.body;

  const sql = `INSERT INTO Donors (name, email, blood) VALUES
  ('${name}', '${email}', '${blood}');`;
  db.run(sql, err => {
    if (err) {
      return console.error(err.message);
    }
    donors.push(req.body);
    res.redirect('/');
  });
});

app.listen(3333, () => {
  console.log('Servidor no ar!');
});
