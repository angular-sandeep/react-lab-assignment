// react Object model
import React from "react";

// ReactDom for rendering React component in DOM
import ReactDom from "react-dom";
import "!style!css!bootstrap/dist/css/bootstrap.min.css";


import SimpleComponent from "./components/simpleComponent.jsx";
import ProductComponent from './components/application/productComponent.jsx';
import ProductUIComponent from './components/application/productUIComponent.jsx';
//ReactDom.render(<SimpleComponent myname="Sandeep"/>, document.getElementById("app"));


ReactDom.render(<ProductUIComponent />, document.getElementById("app"));
