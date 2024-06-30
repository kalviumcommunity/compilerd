import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Righteous } from "next/font/google";
import ThemeSwitcher from './ThemeSwitcher';

const font = Righteous({ subsets: ["latin"], weight: ["400"] });

export default function Header() {
    return (
        <nav className="flex justify-between items-center bg-white dark:bg-slate-950 z-10 w-full px-6 py-5 shadow-md dark:shadow-gray-900/90 fixed">
            <Link href={"/"}>
                <h1 className={
                    cn("text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent", font.className)
                }
                >
                    Compilerd
                </h1>
            </Link>
            <ThemeSwitcher />
        </nav>
    )
}
