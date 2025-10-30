import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/setPageTitle';

const Contact = () => {

    useEffect(() => {
            setPageTitle('Contact');
        }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <p className="mt-4 text-lg">You can reach us at contact@{(import.meta.env.VITE_APP_NAME ? import.meta.env.VITE_APP_NAME.toLowerCase() : 'stickynote')}.com.</p>
        </div>
    );
};

export default Contact;
