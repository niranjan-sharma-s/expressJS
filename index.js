const express = require("express");
const path = require("path");
const users = require("./users.js");
const logger = require("./middleware/logger.js");

const app = express();

//init middleware
app.use(logger);

//Body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Set Static folder
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./routes/api/usersAPI.js"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server running on port", PORT));
