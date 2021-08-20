const { db, pgp } = require("../db/index");
const Router = require("express-promise-router");
const data = require("../data");
const router = new Router();

router.get("/seed", async (req, res) => {
  const cs = new pgp.helpers.ColumnSet(
    [
      "name",
      "category",
      "image",
      "price",
      "count_in_stock",
      "brand",
      "rating",
      "num_reviews",
      "description",
    ],
    {
      table: "products",
    }
  );
  const query = pgp.helpers.insert(data.products, cs);

  await db.none(query);
  res.send("ok").status(200);
});

router.get("/", async (req, res) => {
  const products = await db.query("SELECT *FROM PRODUCTS");

  res.json(products).status(200);
});

router.get("/:id", async (req, res) => {
  const product = await db.query("SELECT *FROM PRODUCTS WHERE ID = $1", [
    req.params.id,
  ]);

  res.json(product[0]).status(200);
});

module.exports = router;
