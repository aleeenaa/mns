import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { ProductList } from './ProductList';
import { ProductPage } from './ProductPage';

export default function App() {
    return (
        <div className="App">
            <header className="App-header">M&S AMS</header>
            <Router>
                <Route path="/" exact component={ProductList} />
                <Route path="/product/:id" component={ProductPage} />
            </Router>
        </div>
    );
}
