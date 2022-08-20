import React from "react";
import { render } from "react-dom";
import App from './components/App.jsx';

/*
Can hardcode some items to render over here to pass down to App to HomePage
*/

render(
  <App />,
  document.getElementById("root")
);
