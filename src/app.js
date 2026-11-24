const express = require("express");

const clickupRoute = require("./routes/clickup.route");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(
  express.text({
    type: "*/*",
  }),
);

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  next();
});
app.use("/clickup", clickupRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Investigation Agent Running");
});
