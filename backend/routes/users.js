const { db, pgp } = require("../db/index");
const Router = require("express-promise-router");
const data = require("../data");
const router = new Router();
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
module.exports = router;

router.get("/seed", async (req, res) => {
  const cs = new pgp.helpers.ColumnSet(
    ["name", "email", "password", "isadmin", "create_dt"],
    {
      table: "users",
    }
  );
  const query = pgp.helpers.insert(data.users, cs);

  await db.none(query);
  res.send("ok").status(200);
});

router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await db.one("SELECT * FROM USERS WHERE EMAIL = $1", [
      req.body.email,
    ]);

    if (user) {
      console.log(user.password);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          id: user.id,
          name: user.name,
          email: user.email,
          isadmin: user.isadmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: "Invalid email or password" });
  })
);
