import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './containers/main';
import Login from './containers/login';
import User from './containers/users';
import SignUp from './containers/signup';
import Item from './containers/item';
import ProviderG from './containers/providerG';
import Order from './containers/order';
import OrderG from './containers/orderG';
import NotFound from './presentational/notfound';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={User} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/items" component={Item} />
        <Route exact path="/delivery/:id" component={ProviderG} />
        <Route exact path="/menu/:id" component={Order} />
        <Route exact path="/orders" component={OrderG} />
      </Switch>
    </BrowserRouter>
  );
}
