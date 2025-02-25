import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./globals.css";

const rootElement = document.getElementById('root');

// Проверка на null перед созданием root
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render( <App/> );
} else {
  console.error("Элемент с id 'root' не найден в документе.");
}

