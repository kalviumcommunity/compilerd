"use client";

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <>
            {theme === "light" ? (
                <Button variant="ghost" className="border border-black" onClick={() => setTheme("dark")}>
                    <MoonIcon className="size-[1rem]" />
                </Button>
            ) : (
                <Button variant="ghost" className="border border-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900" onClick={() => setTheme("light")}>
                    <SunIcon className="size-[1rem] text-black dark:text-white" />
                </Button>
            )}
        </>
    )
}