const scraper = require("./dictionaryScrapingService");

const getWordDefinition = async (word) => {
    try {
        const wordNormalized = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const definitions = await scraper.scrapeDictionary(wordNormalized);
        if (definitions.length === 0) {
            throw new Error(`No definitions found for the word: ${word}`);
        }
        return definitions;
    } catch (error) {
        console.error('Error getting word definition:', error);
        throw error;
    }
};

module.exports = {
    getWordDefinition
};