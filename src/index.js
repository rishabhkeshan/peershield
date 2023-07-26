import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { GrazProvider } from "graz";
import { axelar, cosmoshub, sommelier, mainnetChains, testnetChains } from "graz";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GrazProvider
    grazOptions={{
      defaultChain: testnetChains.osmosistestnet5,
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GrazProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
