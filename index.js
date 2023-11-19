const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

const orders = [];

const checkOrderId = (request, response, next) => {
  const { id } = request.params;

  const index = orders.findIndex((order) => order.id === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  request.userIndex = index;
  request.userId = id

  next()
};

app.get("/orders", (request, response) => {
  return response.json(orders);
});

app.post("/orders", (request, response) => {
  const { order, name } = request.body;

  const newOrder = { id: uuid.v4(), order, name };

  orders.push(newOrder);

  return response.status(201).json(newOrder);
});

app.put("/orders/:id", checkOrderId, (request, response) => {
  const { order, name } = request.body;
  const index = request.userIndex;
  const id = request.userId

  const updateOrder = { id, order, name };

  orders[index] = updateUser;

  return response.json(updateOrder);
});

app.delete("/orders/:id", checkOrderId, (request, response) => {
  const index = request.OrderIndex;

  orders.splice(index, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
