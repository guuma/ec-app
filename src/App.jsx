import React from 'react';
import Router from './Router';
import './assets/reset.css';
import './assets/style.css';
import './assets/theme.js';
import { Header } from './components/Header';

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  );
};

export default App;
