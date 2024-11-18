import { sequelize } from '../../db';

import ItemModel from '../../models/property';  // Import the model definition
import scrapeProperty from '../../helper/scraper';

/**************Add Scrap Data*****************/
export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { url } = req.body;
      const scrapedData = await scrapeProperty(url);

      if (scrapedData && scrapedData.length > 0) {
        
        const Item = ItemModel(sequelize);  
        await Item.bulkCreate(scrapedData);  
      }

      res.status(200).json({ scrapedData, status: 'COMPLETED' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 'FAILED', error: error.message });
  }
}
