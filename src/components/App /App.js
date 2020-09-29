import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/_component.App.css";
import Authentication from "../Authentication /Authentication";
import Home from "../Home /Home";
// import { useStateValue } from "../../state_provider/StateProvider";
import ProtectedRoute from "../../protected_route/protected.route";

function App() {
  //CHECK THE isToken FROM THE CONTEXT AND SET THE STATE WITH THAT VALUE
//   const [{  isTrainer }] = useStateValue();
// console.log(isTrainer === undefined ? 'yes' : 'no');
  return (
    <Router>
      <Switch>
        <Route path="/authentication" component={Authentication} exact />
        <ProtectedRoute path="/" component={Home} exact />
      </Switch>
    </Router>
  );
}

export default App;
