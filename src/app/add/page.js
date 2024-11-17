"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('In Progress');

        const response = await fetch('/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        setStatus(data.status);
    };
    

    return (
        <div className="scraper-container">
        <h1>MagicBricks Scraper</h1>
        <form onSubmit={handleSubmit} className="scraper-form">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter MagicBricks URL"
                required
                className="scraper-input"
            />
            <button type="submit" className="scraper-button">Scrape</button>
        </form>
        {status && <p className="status-message">Scraping Status: {status}</p>}
        <button onClick={() => router.push('/')} className="back-button">
            Go Back
        </button>
    </div>
    );
}