const express = require("express");
const uuid = require("uuid");

const port = 3000;
const app = express();
app.use(express.json());

/*
    - Query params => meusite.com/users?name=gustavo&age29  //Filtros
    - Route params => /users/2     //Buscar, Deletar ou atualizar algo específico
    - Request Body => { "name":"Gustavo", "age":} // quando mandamos informações no corpo da minha requisição
    
    - GET          => Buscar informação np back-end
    - POST         => Criar informação no back-end
    - PUT / PATCH  => Sltersr/Atualizar informação no back-end
    - Delete       => Deletar informação no back-end

    - Middleware => INTERCEPTADOR => Tem o poder de para ou alterar dados da requisição
*/

const users = [];

const checkUserId = (request, response, next) => {
  const { id } = request.params;

  const index = users.findIndex((user) => user.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  request.userIndex = index;
  request.userId = id

  next()
};

app.get("/users", (request, response) => {
  return response.json(users);
});

app.post("/users", (request, response) => {
  const { name, age } = request.body;

  const user = { id: uuid.v4(), name, age };

  users.push(user);

  return response.status(201).json(users);
});

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body;
  const index = request.userIndex;
  const id = request.userId

  const updateUser = { id, name, age };

  users[index] = updateUser;

  return response.json(updateUser);
});

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.userIndex;

  users.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
