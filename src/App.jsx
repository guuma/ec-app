import React from 'react';
import Router from './Router';
import './assets/reset.css';
import './assets/style.css';
import './assets/theme.js';
import { Header } from './components/Header';
import { Footer, Loading } from './components/UIkit';

const App = () => {
  return (
    <Loading>
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
    </Loading>
  );
};

export default App;
