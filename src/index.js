const express = require('express');

const app = express();


app.get('/projects', (request, response) => {
  return response.json({ message: 'Hello Rodrigo' });
});

// expondo a porta que a aplicação vai rodar
app.listen(3333);
