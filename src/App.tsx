import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import { ProductList } from './ProductList';
import { ProductPage } from './ProductPage';

export default function App() {
    let userId = '1';
    return (
        <div className="App">
            <header className="App-header">
                M&S AMS{' '}
                <div>
                    <label
                        className="slds-form-element__label"
                        htmlFor="select-01"
                    >
                        User:
                    </label>
                    <select
                        name="user"
                        id="user"
                        className="slds-select"
                        onChange={(event) => (userId = event.target.value)}
                    >
                        <optgroup label="Select User">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </optgroup>
                    </select>
                </div>
            </header>
            <Router>
                <Route
                    path="/"
                    exact
                    render={() => <ProductList userId={userId} />}
                />
                <Route path="/product/:id" component={ProductPage} />
            </Router>
        </div>
    );
}
