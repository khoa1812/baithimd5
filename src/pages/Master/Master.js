import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function Master() {
    return (
        <>
            <Header />
            <div className="container my-4">
                <Outlet />
            </div>
            <Footer />
        </>
    );
}

export default Master;
