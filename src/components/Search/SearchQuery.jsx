import React, { useState, useEffect, useContext } from 'react';
// context
import { LoadingContext } from '../../contexts/LoadingContext';
import { QueryContext } from '../../contexts/QueryContext';
// React Query
import { useQuery, useMutation, queryCache } from 'react-query';
// mui
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

const getGiphy = async (query) => {
  const request = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=FvEuCE2FCOerjxkHlCRAPdw1L5JnyhG2&q=${query}&limit=50&offset=0&rating=g&lang=en`
  );
  const response = await request.json();

  return response.data;
};

const SearchQuery = () => {
  const classes = useStyles();
  const { setLoading } = useContext(LoadingContext);
  const { query, setQuery, setResults } = useContext(QueryContext);
  const { data, status, isLoading, isError } = useQuery(
    'giphy',
    getGiphy
  );

  const [mutate, info] = useMutation(getGiphy, {
    onSuccess: (data) => {
      queryCache.setQueryData('giphy', () => {
        setResults(data);
        return data;
      });
    },
  });

  // useEffect(() => {}, [query]);

  const handleChange = async (e) => {
    setLoading(info);
    setQuery(e.target.value);

    try {
      await mutate(query);
    } catch (e) {}
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return <div>Error fetching data...</div>;
  // }

  return (
      <InputBase
        value={query}
        onChange={handleChange}
        placeholder="Search for any GIF!"
        inputProps={{ 'aria-label': 'search' }}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }} 
      />
    // <div>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       value={query}
    //       onChange={handleChange}
    //       placeholder='Search for any GIF'
    //     />
    //     <button type='submit' hidden>
    //       Search
    //     </button>
    //   </form>
    //   <br />
    //   {isFetching && <div>Updating...</div>}
    //   {status === 'success' &&
    //     data.map((gif) => {
    //       return <video key={gif} src={gif} autoPlay loop />;
    //     })}
    // </div>
  );
};

export default SearchQuery;
