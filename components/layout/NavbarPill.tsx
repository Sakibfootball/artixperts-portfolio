import Link from "next/link";
import { Home, User, Code, Briefcase, MessageSquare, Star } from "lucide-react";

export function NavbarPill() {
    const navItems = [
        { name: "Home", icon: Home, href: "#home" },
        { name: "About", icon: User, href: "#about" },
        { name: "Skills", icon: Code, href: "#skills" },
        { name: "Projects", icon: Briefcase, href: "#projects" },
        { name: "Testimonials", icon: Star, href: "#testimonials" },
        { name: "Contact", icon: MessageSquare, href: "#contact" },
    ];

    return (
        <nav className="bg-white/30 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/20 rounded-full px-4 py-3 shadow-2xl shadow-black/20 flex items-center gap-2 sm:gap-4 md:gap-6 animate-in slide-in-from-bottom-10 duration-700 fade-in">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className="group relative p-3 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-110 hover:-translate-y-1 active:scale-95"
                    aria-label={item.name}
                >
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-all duration-300 group-hover:rotate-3" />

                    {/* Tooltip */}
                    <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-y-2 group-hover:translate-y-0 shadow-lg border border-white/10">
                        {item.name}
                        {/* Tooltip Arrow */}
                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45"></span>
                    </span>

                    {/* Active/Hover Indicator */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:w-1/2 transition-all duration-300"></span>
                </Link>
            ))}
        </nav>
    );
}
