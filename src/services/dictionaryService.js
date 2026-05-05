const scraper = require("./dictionaryScrapingService");

const getWordDefinition = async (word) => {
    try {
        const definitions = await scraper.scrapeDictionary(word);
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