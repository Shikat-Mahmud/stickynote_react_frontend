import React, { useEffect } from 'react';
import { setPageTitle } from '../../../utils/setPageTitle';

const About = () => {

    useEffect(() => {
            setPageTitle('About');
        }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">About Us</h1>
            <p className="mt-4 text-lg">We are dedicated to providing the best social media experience.</p>
        </div>
    );
};

export default About;
