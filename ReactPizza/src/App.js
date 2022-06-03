import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "./components";
import { Home, Cart, } from './components/pages';
import { fetchPizzas } from './redux/action/pizzas'


function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPizzas())
    }, [])

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Home />} exact />
                    <Route path="/cart" element={<Cart />} exact />
                </Routes>
            </div>
        </div>
    )
}

export default App;
