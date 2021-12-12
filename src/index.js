import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from "react-to-webcomponent";
import PropTypes from "prop-types";
import App from './App';


App.propTypes = {
  name: PropTypes.string,
}

customElements.define(
  "react-wheels", 
  reactToWebComponent(App, React, ReactDOM)
)







// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

