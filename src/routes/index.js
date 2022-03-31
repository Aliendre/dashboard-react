import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from  'react-router-dom';

//PAGES
import Dashboard from '../pages/dashboard';
import Users from '../pages/users';


const Routes_Pages = () => {
    let location = useLocation();
    return(
        // <BrowserRouter basename="/">  
            <AnimatePresence exitBeforeEnter initial={true}>
                <Routes location={location} key={location.pathname}>
                    <Route exact path="/" element={<Dashboard />}/>
                    <Route exact path="/usuarios" element={<Users />}/>
                </Routes>
            </AnimatePresence>          
        // </BrowserRouter>
    );
}

export default Routes_Pages;