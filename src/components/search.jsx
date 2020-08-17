import React, { useState } from 'react';
import { useGiphy } from '../hooks/useGiphy';

const Search = () => {
  const [query, setQuery] = useState('');
  const { results, loading } = useGiphy(query);

  return (
    <div>
      <form>
        <input
          tylvalue={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for any GIF'
        />
        <button type='submit' hidden>
          Search
        </button>
      </form>
      <br />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        results &&
        results.map((item) => {
          return <video key={item} src={item} autoPlay loop />;
        })
      )}
    </div>
  );
};

export default Search;
