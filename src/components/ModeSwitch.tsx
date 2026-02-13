import React from 'react';

const ModeSwitch = ({ currentMode, toggleMode }) => {
    return (
        <div>
            <button onClick={toggleMode}>
                Switch to {currentMode === 'senior' ? 'Planner' : 'Senior'} Mode
            </button>
        </div>
    );
};

export default ModeSwitch;
