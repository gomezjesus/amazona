const express = require("express");
const mountRoutes = require("./routes/index");
const moment = require("moment");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
mountRoutes(app);
app.get("/", (req, res) => {
  res.json(moment().toDate());
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost: ${port}`);
});
