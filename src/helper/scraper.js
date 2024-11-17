const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProperty(url) {
    try {
        const { data } = await axios.get(url); 
        const $ = cheerio.load(data);

        const properties = [];
        $('.mb-srp__list .mb-srp__card').each((index, element) => {
            const property = {};

            /******** Extract Title ********/
            property.title = $(element)
                .find('.mb-srp__card--title')
                .attr('title')
                .trim();

            /******** Extract Location ********/
            property.location = $(element)
                .find('.mb-srp__card__society--name')
                .text()
                .trim();

            /******** Extract Price ********/
            property.price = $(element)
                .find('.mb-srp__card__price--amount')
                .text()
                .trim();

            const imgElement = $(element).find('.mb-srp__card__photo__fig--graphic');
            property.picture = imgElement.attr('data-src') || imgElement.attr('src') || null;
            properties.push(property);
        });

        return properties; 
    } catch (error) {
        return { status: 'Failed', error: error.message };
    }
}

module.exports = scrapeProperty;
