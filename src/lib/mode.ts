import { useState } from 'react';

export const useMode = () => {
    const [mode, setMode] = useState<'senior' | 'planner'>('senior');
    return { mode, setMode };
};