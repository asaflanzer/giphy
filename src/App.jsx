import React from 'react';
import './App.css';
// context
import { LoadingProvider } from './contexts/LoadingContext';
import { QueryProvider } from './contexts/QueryContext';
// components
import { Navbar } from './components/Navbar';
import { Layout } from './components/Layout';
import MainSearch from './components/Search/MainSearch';
import Results from './components/Results/Results';

function App() {
  return (
    <LoadingProvider>
      <QueryProvider>
        <Navbar/>
        <Layout>
          <MainSearch />
          <Results />
        </Layout>
      </QueryProvider>
    </LoadingProvider>
  );
}

export default App;
