const router = require("express").Router();

const { receiveTicket } = require("../controllers/clickup.controller");

router.get("/webhook", (req, res) => {
  console.log("GET webhook hit");
  res.status(200).send("Webhook verified");
});

router.post("/webhook", receiveTicket);

module.exports = router;
