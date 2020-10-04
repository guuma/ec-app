import React, { useCallback, useState } from 'react';
import { HeaderMenus, ClosableDrawer } from './index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/img/icons/logo_transparent.png';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selectors';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: '#fff',
    color: '#444',
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
  },
  iconButtons: {
    margin: '0 0 0 auto',
  },
}));
const Header = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const isSignedIn = getIsSignedIn(selector);

  const [open, setOpen] = useState(false);
  const handleDrawerToggle = useCallback(
    (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(!open);
    },
    [setOpen, open]
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="" width="" onClick={() => dispatch(push('/'))} width="120px" />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  );
};

export default Header;
