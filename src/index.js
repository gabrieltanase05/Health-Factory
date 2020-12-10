import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App /App";
import * as serviceWorker from "./serviceWorker";
import "./style/Main/main.min.css";
import { createStore }  from 'redux';
import { Provider } from 'react-redux'
import authentication from './reducer/authentication.js';

//Create the Store
const store = createStore(authentication, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <React.StrictMode>
    {/* Set the provider with the store*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
