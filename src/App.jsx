import React from 'react';
import Router from './Router'
import './assets/reset.css'
import './assets/style.css'
import './assets/theme.js'
// import { useDispatch, useSelector } from 'react-redux';
// import { signInAction } from './reducks/users/actions';

const App = () =>  {
  return (
    <main>
      <Router/>
    </main>
  )
}

export default App;
