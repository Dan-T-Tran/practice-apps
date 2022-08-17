import React from "react";
import { render } from "react-dom";
import App from './components/App.jsx';

// var testWords = [
//   {
//     word: 'test',
//     definition: 'a thing'
//   },
//   {
//     word: 'mouse',
//     definition: 'cute thing'
//   },
//   {
//     word: 'monitor',
//     definition: 'what you see'
//   },
//   {
//     word: 'money',
//     definition: 'could use more'
//   },
//   {
//     word: 'water',
//     definition: 'man im thirsty'
//   },
// ];

render(
  <App />,
  document.getElementById("root")
);
