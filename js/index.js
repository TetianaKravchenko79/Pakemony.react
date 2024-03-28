import React from 'react';  
import ReactDOM from 'react-dom';  
import { Route, BrowserRouter } from 'react-router-dom';
import MainDialog from './main'; 
import UserDialog from './user';
  
const routing = (  
  <BrowserRouter>  
    <div>
      <Route exact path="/" component={MainDialog } />
      <Route path="/user" component={UserDialog } /> 
    </div>  
  </BrowserRouter>
)  

const elem = document.querySelector('.container') 

if (elem) {
  ReactDOM.render(routing, elem)
}