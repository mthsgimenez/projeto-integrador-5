const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/read", (req, res) => {
    const texto = req.body.texto || '';
    res.render("reader", { textoHtml: texto });
});

module.exports = router;