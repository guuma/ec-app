import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, SingIn, ResetPassword, ProductEdit, ProductList } from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/signin'} component={SingIn} />
      <Route exact path={'/signin/reset'} component={ResetPassword} />
      <Auth>
        <Route exact path={'(/)?'} component={ProductList} />
        <Route path={'/product/edit(/:id)?'} component={ProductEdit} />
      </Auth>
    </Switch>
  );
};

export default Router;
