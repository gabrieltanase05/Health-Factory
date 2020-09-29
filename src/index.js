import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App /App";
import * as serviceWorker from "./serviceWorker";
import { StateProvider } from "./state_provider/StateProvider";
import "./style/Main/main.min.css";
import reducer, { initialState } from "./reducer/reducer";
ReactDOM.render(
  <React.StrictMode>
    {/* Set the context provider for states */}
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
