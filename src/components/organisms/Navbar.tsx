"use client";

import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import { Sun, Moon, LayoutDashboard, Settings, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (root.classList.contains('dark')) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.remove('dark');
        } else {
            root.classList.add('dark');
        }
        setIsDark(!isDark);
    };

    return (
        <header className="sticky top-0 z-50 w-full glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
                        Productive<span className="text-primary/50">.</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-1">
                        <Button variant="ghost" className="gap-2">
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Button>
                        <Button variant="ghost" className="gap-2">
                            <User size={18} />
                            Profile
                        </Button>
                    </nav>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Settings size={20} />
                    </Button>
                    <Button className="ml-2">Get Started</Button>
                </div>
            </div>
        </header>
    );
}
