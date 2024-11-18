// pages/api/properties.js
import { Property } from '../../db';


/********Fetch Property Data*******/
export default async function handler(req, res) {
    try {        
        const properties = await Property.findAll({
            order: [['createdAt', 'DESC']], 
        });

        res.status(200).json(properties);
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: "Failed to fetch properties" });
    }
}
