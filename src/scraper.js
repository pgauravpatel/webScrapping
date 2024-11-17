const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProperty(url) {
    try {
        const { data } = await axios.get(url); 
        const $ = cheerio.load(data);

        const properties = [];
        $('.mb-srp__list .mb-srp__card').each((index, element) => {
            const property = {};

            // Extract title
            property.title = $(element)
                .find('.mb-srp__card--title')
                .attr('title')
                .trim();

            // Extract location
            property.location = $(element)
                .find('.mb-srp__card__society--name')
                .text()
                .trim();

            // Extract price
            property.price = $(element)
                .find('.mb-srp__card__price--amount')
                .text()
                .trim();

            const imgElement = $(element).find('.mb-srp__card__photo__fig--graphic');
            console.log('Image Element:', imgElement.html()); 

            property.picture = imgElement.attr('data-src') || imgElement.attr('src') || null;
            console.log('Extracted Image URL:', property.picture);

            properties.push(property);
        });

        console.log('Extracted Properties:', properties);
        return properties; 
    } catch (error) {
        console.error('Error scraping the property:', error.message);
        return { status: 'Failed', error: error.message };
    }
}

module.exports = scrapeProperty;
