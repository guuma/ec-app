import React, { useCallback, useState } from 'react';
import { push } from 'connected-react-router';
import { PrimaryButton, TextInput } from '../components/UIkit/';
import { signIn } from '../reducks/users/operations.js';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');
  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  return (
    <div className="c-section-container signin-flex">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'Sign In'} onClick={() => dispatch(signIn(email, password))} />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signup'))}>アカウントをお持ちではない方はこちら</p>
        <p onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  );
};

export default SignIn;
