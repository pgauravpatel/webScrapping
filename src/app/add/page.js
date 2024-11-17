"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');
    const [urlError, setError] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isValidMagicBricksUrl(url)){
            setError(true)
            return
        }else{
            setError(false)
        }
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

    function isValidMagicBricksUrl(url) {
        const regex = /^https:\/\/www\.magicbricks\.com(\/.*)?$/;
        return regex.test(url) ? true : false         
    }
    

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
        {urlError && <p className="status-message red">Invalid Url!</p>}

        {status && <p className="status-message">Scraping Status: {status}</p>}
        <button onClick={() => router.push('/')} className="back-button">
            Go Back
        </button>
    </div>
    );
}