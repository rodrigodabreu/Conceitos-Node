const express = require('express');

const app = express();


app.get('/projects', (req, res) => {
  return res.send('Hello world');
});

// expondo a porta que a aplicação vai rodar
app.listen(3333);
