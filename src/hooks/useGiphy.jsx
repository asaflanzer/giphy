import { useState, useEffect } from 'react';

export const useGiphy = (query) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      async function fetchData() {
        try {
          setLoading(true);
          const request = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=FvEuCE2FCOerjxkHlCRAPdw1L5JnyhG2&q=${query}&limit=10&offset=0&rating=g&lang=en`
          );
          const response = await request.json();
          setResults(
            response.data.map((item) => {
              return item.images.preview.mp4;
            })
          );
        } finally {
          setLoading(false);
        }
      }
  
      if (query !== '') {
        fetchData();
      }
    }, [query]);
  
    return { results, loading };
  };
  