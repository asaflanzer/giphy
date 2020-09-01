import React, { useContext } from 'react';
// context
import { QueryContext } from '../../contexts/QueryContext';
// React Query
import { useQuery, useMutation, queryCache } from 'react-query';
// mui
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

  const getGiphy = async (query) => {
    const request = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=FvEuCE2FCOerjxkHlCRAPdw1L5JnyhG2&q=${query}&limit=10&offset=0&rating=g&lang=en`
    );
    const response = await request.json();
    
    return response.data.map((item) => item);
    
  };
  
const MainSearch = () => {
  const { query, setQuery, setResults } = useContext(QueryContext);
  const { data, isLoading, isError} = useQuery(
    'giphyOptions',
    getGiphy
  );

  const [mutateOptions] = useMutation(getGiphy, {
    onSuccess: (data) => {
      queryCache.setQueryData('giphyOptions', () => {
        return data;
      });
    },
  });

  const handleChange = async (e) => {
    setQuery(e.target.value);
    try {
      await mutateOptions(query);
    } catch (e) {}
  };

  const handleSelectedValue = (event,value) => {
    event.preventDefault();
    console.log(value);
    setQuery(value);
    setResults(data);
  }

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}><CircularProgress /></div>;
  }
  if (isError) {
    return <div style={{ display: 'flex', justifyContent: 'center', width: '100%'}}>Error fetching data...</div>;
  }

    return (
        <Autocomplete
        id="autoComplete"
        onChange={handleSelectedValue}
        options={data.map((option) => option.title)}
        clearOnBlur={false}
        autoSelect={true}
        freeSolo={true}
        fullWidth
        loading={isLoading}
        loadingText={<CircularProgress />}
        renderInput={(params) => 
        <TextField
          onChange={handleChange}
          {...params}
          variant="outlined" placeholder='Search for any GIF!'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }} 
        />}
      />
    )
}

export default MainSearch;
