// pages/api/properties.js
import  Property  from '../../models/property';

export default async function handler(req, res) {
    
    const properties = await Property.findAll()
    console.log(properties);
    
    res.status(200).json(properties);
}