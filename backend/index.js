const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const cors = require("cors");

app.use(express.json({ limit: "500mb" }));
const cookieParser = require("cookie-parser");

const { checkToken } = require("./helpers/jwt");
app.use(express.urlencoded({ extended: true }));
const server = require("http").createServer(app);
const PORT = process.env.PORT || 5000;

//init
require("./db");

app.use(cors());
app.use(cookieParser());

//Api
app.use("/", express.static(path.join(__dirname, "angular")));
app.use("/api", checkToken, require("./api/index"));

/******************************************************** */

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
