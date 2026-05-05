const axios = require('axios');
const cheerio = require('cheerio');

const baseUrl = "https://www.dicio.com.br/";

async function scrapeDictionary(word) {
    try {
        const results = [];
        const response = await axios.get(`${baseUrl}${word}`);
        const html = response.data;
        const $ = cheerio.load(html);

        $("p.significado span").each((i, el) => {
            const classe = $(el).attr("class");

            if (classe === "cl" || classe === "etim") return;

            let texto = $(el).text().trim();

            texto = texto.replace(/\[.*?\]\s*/g, "");

            if (texto) {
                results.push(texto);
            }
        });

        return results;
    } catch (error) {
        console.error('Error scraping dictionary:', error);
    }
}

module.exports = {
    scrapeDictionary
};