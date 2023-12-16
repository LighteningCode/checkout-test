import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import ProductComponent from './CheckoutComponent';
import BuyComponent from './BuyComponent'
import * as serviceWorker from './serviceWorker';


let items = [
  {
    id: '1',
    name: "Plain White",
    price: "20.00",
    imageurl: "/productimages/white_shirt.jpg",
    checked: false
  },
  {
    id: '2',
    name: "Nike Airmax",
    price: "60.00",
    imageurl: "/productimages/nike.jpg",
    checked: false
  },
  {
    id: '3',
    name: "Black Jeans",
    price: "32.00",
    imageurl: "/productimages/black_jeans.jpg",
    checked: false
  },
  {
    id: '4',
    name: "Light Blue Jeans",
    price: "30.00",
    imageurl: "/productimages/blue_jeans.jpg",
    checked: false
  },

];






ReactDOM.render(

  <BrowserRouter>
    <Route
      exact
      path="/checkout"
      render={() => (
        <ProductComponent allItems={items} />
      )}
    />
    <Route
      exact
      path="/"
      render={() => (
        <BuyComponent items={items} />
      )}
    />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
