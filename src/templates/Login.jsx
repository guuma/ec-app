import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { signInAction } from '../reducks/users/actions';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h2>ログイン</h2>
      <button
        onClick={() => {
          dispatch(signInAction({ uid: '00001', username: 'hoge' }));
          dispatch(push('/'));
        }}
      >
        ログインする
      </button>
    </div>
  );
};

export default Login;
