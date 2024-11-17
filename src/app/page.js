// pages/properties.js
"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const router = useRouter()

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/getProperty');
            const data = await response.json();
            setProperties(data);
        };

        fetchProperties();
    }, []);

    return (
      <div className="property-cards">
      <div className="header">
          <h1>Scraped Properties</h1>
          <button
              className="navigate-button"
              onClick={() => router.push("/add")} // Replace with your route
          >
             + Add more properties
          </button>
      </div>
      <div className="card-container">
          {properties.map((property) => (
              <div key={property.id} className="property-card">
                  <img
                      src={property.picture}
                      alt={property.title}
                      className="property-image"
                  />
                  <div className="card-content">
                      <h2>{property.title}</h2>
                      <p className="location">
                          Location: {property.location}
                      </p>
                      <p className="price">Price: {property.price}</p>
                      <p className={`status ${property?.status?.toLowerCase()}`}>
                          Status: {property.status}
                      </p>
                  </div>
              </div>
          ))}
      </div>
  </div>
    

    );
}