import React, { useCallback, useState } from 'react';
import { push } from 'connected-react-router';
import { PrimaryButton, TextInput } from '../components/UIkit/';
import { signUp } from '../reducks/users/operations.js';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }
}))

const SignUp = () => {
  const classes = useStyles()
  const dispatch = useDispatch();
  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('');

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );
  return (
    <div className="c-section-container signup-flex">
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <TextInput
        fullWidth={true}
        label={'ユーザ名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={'パスワード(再確認)'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton
          label={'アカウントを登録する'}
          onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
        />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signin'))}>既にアカウントをお持ちの方はこちら</p>
      </div>
    </div>
  );
};

export default SignUp;
