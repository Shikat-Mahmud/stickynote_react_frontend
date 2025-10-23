import React, { useEffect } from 'react';
import { setPageTitle } from '../../utils/setPageTitle';

const Home = () => {

    useEffect(() => {
            setPageTitle('Home');
        }, []);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Welcome to StickyNote</h1>
            <p className="mt-4 text-lg">The best place to share your thoughts.</p>
        </div>
    );
};

export default Home;
