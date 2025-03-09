import React, { useState, useEffect } from "react";

const Quote = () => {
  // State for storing the quote, author, loading, and error status
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch the quote data
  const getQuote = async () => {
    setLoading(true);
    setError(false);

    const quoteOrigin = "https://api.quotable.io/quotes/random";

    try {
      const response = await fetch(quoteOrigin);
      const data = await response.json();

      // Check if the data is valid and set state accordingly
      if (data && data[0] && data[0].content) {
        setQuote(data[0].content); // Set the quote text
        setAuthor(data[0].author || "Unknown"); // Set the author name
      } else {
        setError(true); // Set error if data is invalid
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setError(true); // Set error if fetch fails
    } finally {
      setLoading(false); // Stop the loading state once data is fetched
    }
  };

  // Fetch a new quote when the component mounts
  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="quote-wrapper">
      <div className="quote-content-div">
        {loading && (
          <div className="loading">
            <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>{" "}
            Loading...
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}
            Error fetching quote. Please try again later.
          </div>
        )}

        {!loading && !error && (
          <div className="quote-content">
            <p className="quote-text">"{quote}"</p>
            <p className="quote-author">
              <i className="glyphicon-user" aria-hidden="true"></i> {author}
            </p>
          </div>
        )}

        <div className="quote-buttons">
          <button onClick={getQuote}>Get Another Quote</button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
