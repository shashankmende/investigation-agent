const express = require("express");

const clickupRoute = require("./routes/clickup.route");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  next();
});
app.use("/clickup", clickupRoute);


app.listen(3000, () => {
  console.log("Investigation Agent Running");
});
