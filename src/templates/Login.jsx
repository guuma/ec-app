import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Users from '../reducks/users/operations'

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispatch(Users.signIn())
        }}
      >
        ログインする
      </button>
    </div>
  );
};

export default Login;
