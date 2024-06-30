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
                <Button value="dark" onClick={() => setTheme("dark")}>
                    <MoonIcon className="size-[1rem]" />
                </Button>
            ) : (
                <Button value="light" onClick={() => setTheme("light")}>
                    <SunIcon className="size-[1rem]" />
                </Button>
            )}
        </>
    )
}