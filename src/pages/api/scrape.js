import Item from '../../models/property';
import scrapeProperty from '../../scraper';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        console.log('abc')
        const scrapedData = await scrapeProperty(url);
        console.log(9,scrapedData)
        if (scrapedData && scrapedData.length > 0) {
            try {
                // await Item.sync({force:true})
                await Item.bulkCreate(scrapedData);
                console.log('All properties saved successfully.');
            } catch (error) {
                console.error('Error saving properties in bulk:', error.message);
            }
        }
        res.status(200).json({scrapedData, status: 'COMPLETED'});
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}