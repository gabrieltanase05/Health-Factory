import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/_component.App.css";
import Authentication from "../Authentication /Authentication";
import Home from "../Home /Home";
import ProtectedRoute from "../../protected_route/protected.route";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../actions/authentication.js";
import Loader from "../Loader /Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const isToken = useSelector( state => state.isToken )
  const dispatch = useDispatch();
  const localToken = window.localStorage.getItem('healthFactory');

  let loadingTimeout = setTimeout(() => {
    setLoading(false)
    clearTimeout(loadingTimeout);
  }, 2000)

 console.log(localToken)
  if(localToken) {
    dispatch(setToken(true))
    console.log("TOKEN TRUE" + localToken);
  }

  return (
      loading ? 
        <Loader/>
        :
        <Router>
        <Switch>
            <Route path="/authentication" component={Authentication} exact />
            <ProtectedRoute path="/" component={Home} exact />
          </Switch>
        </Router>
    
  );
}

export default App;
