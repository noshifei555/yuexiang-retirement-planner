import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="hero">
            <h1>Welcome to the Retirement Planner</h1>
            <p>Your journey to a secure financial future begins here.</p>
            <div className="buttons">
                <Link to="/calc/senior" className="button">Senior Mode</Link>
                <Link to="/calc/planner" className="button">Planner Mode</Link>
            </div>
        </div>
    );
};

export default HomePage;