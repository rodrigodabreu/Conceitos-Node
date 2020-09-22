const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json())

app.get('/projects', (request, response) => {
  //pegando os query params
  const {title, owner} = request.query;

  console.log(title);
  console.log(owner);

  return response.json([
    'projeto 1',
    'projeto 2'
  ]);
});


app.put('/projects/:id', (request, response) => {

  const {id} = request.params;

  console.log(id)

  return response.json([
    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])
});

app.post('/projects', (request, response) => {

  const {title, owner} = request.body;

  console.log(title)
  console.log(owner)

  return response.json([

    'Projeto 1',
    'Projeto 2',
    'Projeto 3',
  ])

});

// expondo a porta que a aplicação vai rodar
app.listen(3333, () => {
  console.log('Back-end started!')
});
