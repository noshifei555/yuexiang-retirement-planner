// src/lib/storage.ts

/**
 * SSR-safe localStorage wrapper functions
 */

export const getItem = (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
};

export const setItem = (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
};

export const removeItem = (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
};