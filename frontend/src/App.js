import React from 'react';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <a className="brand" href="/">
                            amazona
                        </a>
                    </div>
                    <div>
                        <a href="/cart">Cart</a>
                        <a href="/signin">Sign In</a>
                    </div>
                </header>
                <main>
                    <Route path = "/" component={HomeScreen} exact/>
                    <Route path="/product/:id" component={ProductScreen}/>
                </main>
                <footer className="row center">All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
