import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold font-space mb-4 bg-linear-to-r from-indigo-400 via-purple-400 to-teal-400 text-transparent bg-clip-text inline-block">
                            ArtiXperts
                        </h3>
                        <p className="text-gray-400 mb-6 max-w-sm">
                            Transforming ideas into digital experiences that inspire and engage.
                            Building the future of the web, one pixel at a time.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors duration-300"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 transition-colors duration-300"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#home"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#skills"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Skills
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#projects"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Projects
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-4">Services</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-400">Web Development</li>
                            <li className="text-gray-400">UI/UX Design</li>
                            <li className="text-gray-400">Mobile Apps</li>
                            <li className="text-gray-400">Brand Strategy</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} ArtiXperts. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
