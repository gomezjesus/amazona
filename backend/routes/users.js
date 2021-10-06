const { db, pgp } = require("../db/index");
const Router = require("express-promise-router");
const data = require("../data");
const router = new Router();
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const moment = require("moment");
module.exports = router;

const userExists = (email) => {
  try {
  } catch (error) {}
};

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
    try {
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
    } catch (error) {
      res.status(401).send({ message: "Invalid email or password" });
    }

    res.status(401).send({ message: "Invalid email or password" });
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const exists = db.one("SELECT EMAIL FROM USERS WHERE EMAIL = $1", [
      req.bodyemail,
    ]);
    if (exists) {
      alert("Duplicate email");
      return;
    }
    const cs = new pgp.helpers.ColumnSet(
      ["name", "email", "password", "create_dt"],
      {
        table: "users",
      }
    );
    let user = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      create_dt: moment().toDate(),
    };
    const query = pgp.helpers.insert(user, cs);

    await db.none(query);
    res
      .send({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        create_dt: moment().toDate(),
        token: generateToken(user),
      })
      .status(200);
  })
);
