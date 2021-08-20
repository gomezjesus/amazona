const pgp = require("pg-promise")({});
const database = {
  user: "penco",
  host: "localhost",
  database: "amazona",
  password: "pencopenco",
  port: 5432,
  max: 150,
};

const db = pgp(database);
module.exports = { db, pgp };


