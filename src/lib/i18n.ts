import React, { createContext, useContext, useState } from 'react';

const I18nContext = createContext();

export const getDict = (lang) => {
    const dictionaries = {
        en: { welcome: 'Welcome' },
        zh: { welcome: '欢迎' },
        // Add more languages here
    };
    return dictionaries[lang] || dictionaries.en;
};

export const t = (key, lang) => {
    const dict = getDict(lang);
    return dict[key] || key;
};

export const useI18n = () => {
    const [lang, setLang] = useState('en');
    return { lang, setLang, t: (key) => t(key, lang) };
};

export const I18nProvider = ({ children }) => {
    const { lang, setLang, t } = useI18n();
    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => useContext(I18nContext);