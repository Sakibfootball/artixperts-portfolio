"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string;
}

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, [testimonials.length]);

    const prev = () => {
        setCurrentIndex((current) =>
            current === 0 ? testimonials.length - 1 : current - 1
        );
    };

    // Pause auto-play on hover
    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="overflow-hidden relative min-h-[400px] md:min-h-[300px] flex items-center">
                <div
                    className="flex transition-transform duration-500 ease-out w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="w-full flex-shrink-0 px-4">
                            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                                <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full blur-lg opacity-50"></div>
                                    <Image
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover rounded-full border-4 border-white relative z-10"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md z-20">
                                        <Quote className="w-4 h-4 text-purple-500 fill-current" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
                                        "{testimonial.quote}"
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-purple-600 font-medium">
                                            {testimonial.designation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={prev}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label="Previous testimonial"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                ? "bg-purple-600 w-8"
                                : "bg-gray-300 hover:bg-purple-300"
                                }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label="Next testimonial"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
