import React from 'react';
import Router from './Router'
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInAction } from './reducks/users/actions';

const App = () =>  {
  return (
    <main>
      <Router/>
    </main>
  )
}

export default App;
