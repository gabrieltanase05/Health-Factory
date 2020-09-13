import React from "react";
import Welcome from "../Welcome /Welcome";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/_component.App.css";
import Authentication from "../Authentication /Authentication";
import Home from "../Home /Home";
import { useStateValue } from "../../StateProvider";

function App() {
  //CHECK THE isToken FROM THE CONTEXT AND SET THE STATE WITH THAT VALUE
  const [{ isToken }] = useStateValue();

  return (
    <Router>
      <Switch>
        <Route path={!isToken ? "/" : "/welcome"} exact>
          <Welcome />
        </Route>
        <Route path="/authentication">
          <Authentication />
        </Route>
        <Route path={isToken ? "/" : "/home"} exact>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
