const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api", require("./routes/profile"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/instructions.html');
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Server listening on PORT ${PORT}`);
});
