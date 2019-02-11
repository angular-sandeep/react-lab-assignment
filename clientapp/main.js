// react Object model
import React from "react";

// ReactDom for rendering React component in DOM
import ReactDom from "react-dom";
import "!style!css!bootstrap/dist/css/bootstrap.min.css";


import SimpleComponent from "./components/simpleComponent.jsx";
import ProductComponent from './components/application/productComponent.jsx';
//import ProductUIComponent from './components/application/productUIComponent.jsx';

// importing HOC component
import  CompanyListComponent  from "./HoC/companyList.jsx";
import  StockListComponent  from "./HoC/stockList.jsx";
import  HoC  from "./HoC/hocComponent.jsx";

//ReactDom.render(<SimpleComponent myname="Sandeep"/>, document.getElementById("app"));

// data for HOC component
let companyData = [
    {Id:101, Name:'Google', Location:'Pune'},
    {Id:102, Name:'Microsoft', Location: 'Mumbai'},
    {Id:103, Name:'Oracle', Location: 'Banglore'},
    {Id:104, Name:'Atos', Location: 'Noida'},
]

let stockData = [
    {Id:101, Name:'NSE', Location: 'Delhi', Year: 1987},
    {Id:102, Name:'BSE', Location: 'Mumbai', Year: 1940},
]

let CompanyDataComponent = HoC(CompanyListComponent, companyData);
let StockDataComponent = HoC(StockListComponent, stockData);


//ReactDom.render(<CompanyDataComponent />, document.getElementById("app"));
ReactDom.render(<StockDataComponent />, document.getElementById("app"));
