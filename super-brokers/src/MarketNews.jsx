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
        console.log('Market news response:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setNews(response.data);  // Set the news articles in state
        } else {
          setError('Unexpected data format from API');
        }
      } catch (err) {
        console.error('Error fetching market news:', err);
        setError('Failed to fetch market news');
      } finally {
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
              <h3>{item.headline}</h3>
              <p>{item.summary}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer">Read more</a>
              <hr />
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
