import React from 'react';

const Header = () => {
    return (
        <header className="header">
            <div className="brand">Brand Name</div>
            <nav className="navigation">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div className="options">
                <select className="language-switch">
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                </select>
                <button className="mode-switch">Toggle Mode</button>
            </div>
        </header>
    );
};

export default Header;
