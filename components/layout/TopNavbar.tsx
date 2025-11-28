"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";
import { NavbarPill } from "./NavbarPill";

export function TopNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
            <div className="absolute inset-0 bg-white/70 dark:bg-black/60 backdrop-blur-xl border-b border-white/20 shadow-sm"></div>

            <div className="container mx-auto px-6 h-20 relative flex items-center justify-between">
                {/* Brand Logo */}
                <Link href="/" className="group flex items-center gap-2 z-50">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-105">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-teal-600 dark:from-white dark:via-purple-200 dark:to-teal-200 drop-shadow-sm font-space tracking-tight">
                        ArtiXpert
                    </span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden relative z-50 p-2 text-gray-800 dark:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Menu Placeholder (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-4">
                    {/* Future content like theme toggle or social icons could go here */}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-3xl z-40 transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                    }`}
            >
                <div onClick={() => setIsMenuOpen(false)}>
                    <NavbarPill />
                </div>
            </div>
        </header>
    );
}
