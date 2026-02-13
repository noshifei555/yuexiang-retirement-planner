import React from 'react';

const LanguageSwitch = ({ currentLang, onLangChange }) => {
    const languages = [
        { code: 'en', label: 'English' },
        { code: 'zh', label: '中文' }
    ];

    return (
        <div>
            {languages.map(lang => (
                <button
                    key={lang.code}
                    onClick={() => onLangChange(lang.code)}
                    style={{ fontWeight: currentLang === lang.code ? 'bold' : 'normal' }}
                >
                    {lang.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitch;