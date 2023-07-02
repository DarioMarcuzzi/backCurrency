const { Router } = require("express");

const {
  getAllCurrency,
  getCurrencyByBase,
} = require("../controladores/Currency-C");

const router = Router();

router.get("/", getCurrencyByBase);

module.exports = router;
