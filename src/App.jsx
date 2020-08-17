import React from 'react';
import './App.css';
// components
// import Search from './components/search';
import SearchQuery from './components/searchQuery';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Giphy</h1>
        <SearchQuery />
      </header>
    </div>
  );
}

export default App;
