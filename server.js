const express = require('express');
const app = express();
const nunjucks = require('nunjucks');

// Habilita o express para receber requisições do tipo Json.
app.use(express.json());
// Configurar o servidor para apresentar arquivos estáticos.
app.use(express.static('public'));

// Configurando o template engine.
nunjucks.configure('./', {
  express: app
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(3333, () => {
  console.log('Servidor no ar!');
});
