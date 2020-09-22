const { response } = require("express");
const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

//vai servir como o nosso banco de dados em memória
const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)){
    return response.status(400).json({error: 'Invalid project ID.'});
  }
  return next();

}
//Middleware que loga as requisições
app.use(logRequests);

//Middleware que valida o id
app.use('/projects/:id', validateProjectId);

app.get("/projects", (request, response) => {
  //pegando os query params
  const { title, owner } = request.query;

  //Adicionando filtro de busca pelo título
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;

  //buscando os dados do body
  const { title, owner } = request.body;

  //buscando a posição do projeto no array de projetos
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  //substituindo o projeto existente pelos novo projeto criado com os dados passados pelo body
  projects[projectIndex] = project;

  //sempre que atualizar, retornar APENAS o projeto atualizado, NUNCA a lista completa
  return response.json(project);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  //buscando a posição do projeto no array de projetos
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(404).json({ error: "Project not found." });
  }

  //removendo o projeto
  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

// expondo a porta que a aplicação vai rodar
app.listen(3333, () => {
  console.log("🚀 Back-end started!");
});
