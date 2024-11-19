import React, { useState, useEffect } from 'react';

const Quote = () => {
  // State for storing the quote, author, loading, and error status
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch the quote data
  const getQuote = async () => {
    setLoading(true);
    setError(false);
    
    const quoteOrigin = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?';
    
    try {
      const response = await fetch(quoteOrigin);
      const data = await response.json();
      
      if (data && data.quoteText) {
        setQuote(data.quoteText);
        setAuthor(data.quoteAuthor || 'Unknown');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a new quote when the component mounts
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="quote-wrapper">
      {loading && (
        <div className="loading">
          <i className="fa fa-spinner fa-spin" aria-hidden="true"></i> Loading...
        </div>
      )}

      {error && (
        <div className="error-message">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Error fetching quote. Please try again later.
        </div>
      )}

      {!loading && !error && (
        <div className="quote-content">
          <p className="quote-text">{quote}</p>
          <p className="quote-author">
            <i className="glyphicon glyphicon-user" aria-hidden="true"></i> {author}
          </p>
        </div>
      )}

      <div className="quote-buttons">
        <button onClick={getQuote}>Get Another Quote</button>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${quote}\n\t~ ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tweet-btn"
        >
          Tweet This Quote
        </a>
      </div>
    </div>
  );
};

export default Quote;
