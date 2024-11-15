import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MarketNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketNews = async () => {
      try {
        console.log('Fetching market news...');
        const response = await axios.get('http://localhost:3001/api/news/market-news');
        console.log('Response data:', response.data);
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching market news:', err);
        setError('Failed to fetch market news');
        setLoading(false);
      }
    };

    fetchMarketNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>General Market News</h2>
      {news.length > 0 ? (
        <div>
          {news.map((item, index) => (
            <div key={index}>
              {/* Display headline and summary in plain text */}
              <p>{`Headline: ${item.headline}`}</p>
              <p>{`Summary: ${item.summary}`}</p>
              <p>{`URL: ${item.url}`}</p>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}

export default MarketNews;
