const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.post("/api/read", (req, res) => {
    const text = req.body.text || '';

    const segmenter = new Intl.Segmenter("pt-BR", { granularity: "word" });

    const tokens = [...segmenter.segment(text)].map((token) => ({
        index: token.index,
        text: token.segment,
        isWord: token.isWordLike,
    }));

    res.json(tokens);
});

router.post("/read", (req, res) => {
    const texto = req.body.texto || '';
    res.render("reader", { textoHtml: texto });
});

module.exports = router;