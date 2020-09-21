import React from 'react';
import { useSelector } from 'react-redux';
import * as Users from '../reducks/users/selectors';

const Home = () => {
  const selector = useSelector((state) => state);
  console.log(selector.users);
  console.log(Users.getUserId(selector));
  const uid = Users.getUserId(selector);
  const username = Users.getUsername(selector);
  return (
    <div>
      <h2>Home</h2>
      <p>ユーザID：{uid}</p>
      <p>ユーザ名: {username}</p>
    </div>
  );
};

export default Home;
