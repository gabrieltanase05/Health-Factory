import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/_component.App.css";
import Authentication from "../Authentication ";
import Home from "../Home ";
import ProtectedRoute from "../../protected_route/protected.route";
import { connect } from "react-redux";
import { setLoading, setToken, setUser, setTrainer } from "../../actions/authentication.js";
import Loader from "../Loader ";
import { getRequest } from '../../request/request.js';
import Profile from "../Profile ";
import NotFound from "../NotFound ";

function App(props) {

  // Looking for token in localStorage
  const localStorage = JSON.parse(window.localStorage.getItem('healthFactory'));
  useEffect(() => {
    // If in localStorage exist a token with the key 'healthFactory'
    if(localStorage) {
      // Update the ste of isToken from Redux Store with his value
      props.setToken(localStorage.token);
      props.setTrainer(localStorage.isTrainer);
      props.getRequest(localStorage.token, 'VERIFY?token=', props, localStorage.isTrainer );
      // Request to server to verify the token and 
    } else {
      props.setLoading(false);
    }
    // eslint-disable-next-line
  }, [])

  return (
      props.loading ?
        <Loader/>
        :
        <Router>
        <Switch>
            <Route path="/authentication" component={Authentication} exact />
            <ProtectedRoute path="/" component={Home} exact />
            <ProtectedRoute path="/profile" component={Profile} exact />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
    
  );
}

// Redux middleware
const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
    isTrainer: state.app.isTrainer
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setToken(token) {
      dispatch(setToken(token));
    },
    setLoading(boolean) {
      dispatch(setLoading(boolean));
    },
    setUser(obj) {
      dispatch(setUser(obj));
    },
    getRequest(token, request, props, isTrainer) {
      dispatch(getRequest(token, request, props, isTrainer));
    },
    setTrainer(boolean) {
      dispatch(setTrainer(boolean));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
