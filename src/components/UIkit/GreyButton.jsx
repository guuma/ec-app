import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { theme } from '../../assets/theme';

const useStyle = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.grey['300'],
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    transition: '.5s',
  },
}));

const GreyButton = (props) => {
  const classes = useStyle();
  return (
    <Button className={classes.button} varient="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};

export default GreyButton;
