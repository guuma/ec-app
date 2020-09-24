import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../reducks/users/operations';
import * as Users from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch()
  console.log(selector.users);
  console.log(Users.getUserId(selector));
  const uid = Users.getUserId(selector);
  const username = Users.getUsername(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>ユーザID：{uid}</p>
      <p>ユーザ名: {username}</p>
      <button onClick={() => dispatch(signOut())}> SIGN OUT</button>
    </div>
  );
};

export default Home;
