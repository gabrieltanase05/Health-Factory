import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App /App";
import * as serviceWorker from "./serviceWorker";
import "./style/Main/main.min.css";
import { createStore, applyMiddleware, combineReducers }  from 'redux';
import { Provider } from 'react-redux'
import authentication from './reducer/authentication.reducer.js';
import app from './reducer/app.reducer.js';
import user from './reducer/user.reducer.js';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


//Create the Store
const store = createStore(
  combineReducers({authentication, app, user}),
  {},
  composeWithDevTools(applyMiddleware(logger, thunkMiddleware))
)

store.subscribe(()=> {
  console.log("--Store updated--")
  console.log(store.getState())
  console.log("-----------------")
})
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
