import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./globals.css"
import store from "./store/redux-store"
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <App />
  </Provider>
);


