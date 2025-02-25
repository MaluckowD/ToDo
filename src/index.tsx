import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './globals.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement) {
  const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
} else {
  console.error("Элемент с id 'root' не найден в документе.");
}

