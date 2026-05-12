const dictionaryService = require("../services/dictionaryService");

const getWordDefinition = async (req, res) => {
    const word = req.params.word;
    try {
        const definitions = await dictionaryService.getWordDefinition(word);
        res.json({ word, definitions });
    }
    catch (error) {
        res.status(404).json({ error: "not found" });
    }
};

module.exports = { getWordDefinition };