const axios = require('axios');
const cheerio = require('cheerio');
const AppError = require('../utils/AppError');

class DictionaryScraper {
  static baseUrl = "https://www.dicio.com.br/";

  static async scrape(word) {
    try {
      const results = [];
      const response = await axios.get(`${this.baseUrl}${word}`);
      const $ = cheerio.load(response.data);

      $("p.significado span").each((i, el) => {
        const classe = $(el).attr("class");
        if (classe === "cl" || classe === "etim") return;

        let texto = $(el).text().trim();
        texto = texto.replace(/\[.*?\]\s*/g, "");

        if (texto) results.push(texto);
      });

      return results;
    } catch (err) {
      console.error("Erro no scraper do dicionário:", err);
      return [];
    }
  }
}

class DictionaryService {
  static normalize(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  static async getWordDefinition(word) {
    const normalized = DictionaryService.normalize(word);
    const definitions = await DictionaryScraper.scrape(normalized);

    if (!definitions.length) {
      throw new AppError("Significado não encontrado para esta palavra", 404);
    }

    return definitions;
  }
}

module.exports = {
  getWordDefinition: DictionaryService.getWordDefinition,
  DictionaryService
};