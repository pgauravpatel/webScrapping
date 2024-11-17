"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(6);
    const router = useRouter();

    useEffect(() => {
        const fetchProperties = async () => {
            const response = await fetch('/api/getProperty');
            const data = await response.json();
            setProperties(data);
        };

        fetchProperties();
    }, []);

    
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(
        indexOfFirstProperty,
        indexOfLastProperty
    );
    
    const totalPages = Math.ceil(properties.length / propertiesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="property-cards">
            <div className="header">
                <h1>Scraped Properties</h1>
                <button
                    className="navigate-button"
                    onClick={() => router.push("/add")}
                >
                    + Add more properties
                </button>
            </div>
            <div className="card-container">
                {currentProperties.map((property) => (
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
                          
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination-controls">
                <button
                    onClick={handlePrevPage}
                    className="pagination-button"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="pagination-button"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
