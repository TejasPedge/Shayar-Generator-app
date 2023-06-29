import React, { useState } from 'react';
import './ShayariGenerator.css'; // Import the CSS file for styling

const ShayariGenerator = () => {
  const [inputWord, setInputWord] = useState('');
  const [generatedShayari, setGeneratedShayari] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateShayari = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://wild-gray-goat-vest.cyclic.app/generate-shayari/${inputWord}`);
      const data = await response.json();

      if (response.ok) {
        const { shayari } = data;
        setGeneratedShayari(shayari);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="shayari-generator">
      <h1>Shayari Generator</h1>
      <input
        type="text"
        placeholder="Enter a word"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
      />
      <button onClick={generateShayari}>Generate Shayari</button>

      {isLoading && <p>Loading...</p>}

      {error && <p className="error-message">Error: {error}</p>}

      {generatedShayari && (
        <div className="shayari-container">
          <p className="shayari">
            {generatedShayari.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                <span className="neon-animation">{line}</span>
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShayariGenerator;
