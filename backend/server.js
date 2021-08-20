const express = require("express");
const mountRoutes = require("./routes/index");
const moment = require("moment");
const app = express();
mountRoutes(app);
app.get("/", (req, res) => {
  res.json(moment().toDate());
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost: ${port}`);
});
