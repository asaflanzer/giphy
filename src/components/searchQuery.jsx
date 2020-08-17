import React, { useState, useEffect } from 'react';
// React Query
import { useQuery, useMutation, queryCache } from 'react-query';

const getGiphy = async (query) => {
  const request = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=FvEuCE2FCOerjxkHlCRAPdw1L5JnyhG2&q=${query}&limit=10&offset=0&rating=g&lang=en`
  );
  const response = await request.json();
  return response.data.map((item) => {
    return item.images.preview.mp4;
  });
};

const updateGiphy = async (query) => {
  const request = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=FvEuCE2FCOerjxkHlCRAPdw1L5JnyhG2&q=${query}&limit=10&offset=0&rating=g&lang=en`
  );
  const response = await request.json();
  return response.data.map((item) => {
    return item.images.preview.mp4;
  });
};

const SearchQuery = () => {
  const [query, setQuery] = useState('');
  const { data, status, isLoading, isError, isFetching } = useQuery(
    'giphy',
    getGiphy
  );

  const [mutate, info] = useMutation(updateGiphy, {
    onSuccess: (data) => {
      queryCache.setQueryData('giphy', () => {
        return data;
      });
    },
  });

  useEffect(() => {}, [query]);

  const handleChange = async (e) => {
    setQuery(e.target.value);

    try {
      await mutate(query);
    } catch (e) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error fetching data...</div>;
  }

  console.log(info);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={handleChange}
          placeholder='Search for any GIF'
        />
        <button type='submit' hidden>
          Search
        </button>
      </form>
      <br />
      {isFetching && <div>Updating...</div>}
      {status === 'success' &&
        data.map((gif) => {
          return <video key={gif} src={gif} autoPlay loop />;
        })}
    </div>
  );
};

export default SearchQuery;
