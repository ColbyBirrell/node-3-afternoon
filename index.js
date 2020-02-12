require("dotenv").config();
const express = require("express");
const massive = require("massive");
const prod_ctrl = require("./products_controller");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
console.log("SERVER_PORT:", SERVER_PORT, "CONNECTION:", CONNECTION_STRING);

massive(CONNECTION_STRING)
  .then(dbObj => {
    app.set("db", dbObj);
  })
  .catch(err => console.log(err));

app.use(express.json());

app.post("/api/products", prod_ctrl.create);
app.get("/api/products", prod_ctrl.getAll);
app.get("/api/products/:id", prod_ctrl.getOne);
app.put("/api/products/:id", prod_ctrl.update);
app.delete("/api/products/:id", prod_ctrl.delete);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on ${SERVER_PORT}`);
});
