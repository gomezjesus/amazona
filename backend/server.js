const express = require("express");
const mountRoutes = require("./routes/index");

const app = express();
mountRoutes(app);
app.get("/", (req, res) => {
  res.send("Server ready");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost: ${port}`);
});
