const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

// Configurar o servidor para apresentar arquivos estáticos.
app.use(express.static('public'));

// Habilita o express para receber requisições do tipo urlencoded.
app.use(express.urlencoded({ extended: true }));

// Configurando o template engine.
nunjucks.configure('./', {
  express: app,
  noCache: true
});

const donors = [];

app.get('/', (req, res) => {
  res.render('index.html', { donors });
});

app.post('/', (req, res) => {
  donors.push(req.body);
  res.redirect('/');
});

app.listen(3333, () => {
  console.log('Servidor no ar!');
});
