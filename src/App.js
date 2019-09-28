import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.components'
import signInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component'
import { auth } from './firebase/firebase.utils'
export default class App extends Component {
  constructor(props) {
    super();
    this.state = {
      currentUser: null,
    }
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/Shop' component={ShopPage} />
          <Route path='/signIn' component={signInSignUpPage} />
        </Switch>
      </div>
    )
  }
}

