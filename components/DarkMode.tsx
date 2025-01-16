'use client';

import darkModeIcon from '@/assets/dark-mode.svg';
import lightModeIcon from '@/assets/light-mode.svg';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const DarkMode = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(
        localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkTheme);
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
    }, [isDarkTheme]);

    return (
        <Button onClick={() => setIsDarkTheme(!isDarkTheme)}>
            <Image
                alt={isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                className="w-6"
                src={isDarkTheme ? lightModeIcon : darkModeIcon}
            />
        </Button>
    );
};
export default DarkMode;
