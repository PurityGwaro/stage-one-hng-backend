
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", require("./routes/profile"));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${PORT}`);
});
