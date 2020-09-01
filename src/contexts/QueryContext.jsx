import React, { createContext, useState } from 'react';

const QueryContext = createContext(null);

function QueryProvider({ children }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

  return (
    <QueryContext.Provider value={{ query, setQuery, results, setResults }}>
      {children}
    </QueryContext.Provider>
  );
}

export { QueryProvider, QueryContext };
