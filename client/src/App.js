import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions'
import { Provider } from 'react-redux';
import store from './store/store';
import './App.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ArtistList from './components/artist/ArtistList';
import ArtistDetail from './components/artist/ArtistDetail';

import PrivateRoute from './components/auth/PrivateRoute';
import Dashboard from './components/dashboard/dashboard';
import CreateGenre from './components/admin/CreateGenre';
import CreateArtist from './components/admin/CreateArtist';
import CreateTrack from './components/admin/CreateTrack';

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/artist/list' component={ArtistList} />
            <Route exact path='/artist/detail/:slug' component={ArtistDetail} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/admin/create/genre' component={CreateGenre} />
              <PrivateRoute exact path='/admin/create/artist' component={CreateArtist} />
              <PrivateRoute exact path='/admin/create/track' component={CreateTrack} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
