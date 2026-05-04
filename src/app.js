const express = require("express");
const exhbs = require("express-handlebars");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const pagesRoutes = require("./routes/pagesRoutes");

const app = express();
const hbs = exhbs.create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/api", userRoutes);
app.use("/", pagesRoutes);

module.exports = app;