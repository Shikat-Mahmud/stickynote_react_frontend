import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Include/Public/Header';
import Footer from '../Include/Public/Footer';

const PublicLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default PublicLayout;
