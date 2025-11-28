import Link from "next/link";
import { Home, User, Code, Briefcase, MessageSquare, Star } from "lucide-react";
import { NavbarPill } from "./NavbarPill";

export function FloatingNavbar() {
    return (
        <div className="hidden md:block fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
            <NavbarPill />
        </div>
    );
}
