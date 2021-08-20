const { db, pgp } = require("../db/index");
const Router = require("express-promise-router");
const data = require("../data");
const router = new Router();
module.exports = router;

router.get("/seed", async (req, res) => {
  const cs = new pgp.helpers.ColumnSet(
    ["name", "email", "password", "isadmin"],
    {
      table: "users",
    }
  );
  const query = pgp.helpers.insert(data.users, cs);

  await db.none(query);
  res.send("ok").status(200);
});
