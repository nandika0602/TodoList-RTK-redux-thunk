import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


import { Provider } from "react-redux";
import reducer from "./store3/reducer";
import {legacy_createStore as createStore, applyMiddleware} from 'redux'
// import { createStore } from "redux";
import {thunk} from 'redux-thunk'

const store = createStore(reducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
