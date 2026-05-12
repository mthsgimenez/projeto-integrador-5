const parseText = (req, res) => {
    const text = req.body.text || '';

    const segmenter = new Intl.Segmenter("pt-BR", { granularity: "word" });

    const tokens = [...segmenter.segment(text)].map((token) => ({
        index: token.index,
        text: token.segment,
        isWord: token.isWordLike,
    }));

    res.json(tokens);
};

module.exports = { parseText };