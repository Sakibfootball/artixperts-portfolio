"use client";

import { useState, useEffect } from "react";

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

    // Auto-rotate testimonials
    useEffect(() => {
        if (!isAutoPlaying || testimonials.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1
        );
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    if (testimonials.length === 0) return null;

    return (
        <div className="relative max-w-4xl mx-auto">
            {/* Main testimonial card */}
            <div className="relative min-h-[400px] flex items-center justify-center px-4 md:px-12">
                {testimonials.map((t, idx) => {
                    const offset = idx - currentIndex;
                    const isActive = idx === currentIndex;

                    return (
                        <div
                            key={idx}
                            className={`absolute w-full transition-all duration-700 ease-out ${isActive
                                ? "opacity-100 scale-100 z-20 translate-x-0"
                                : offset === 1 || (offset === -(testimonials.length - 1))
                                    ? "opacity-30 scale-90 z-10 translate-x-[40%] md:translate-x-[30%]"
                                    : offset === -1 || (offset === testimonials.length - 1)
                                        ? "opacity-30 scale-90 z-10 -translate-x-[40%] md:-translate-x-[30%]"
                                        : "opacity-0 scale-75 translate-x-0"
                                }`}
                            style={{
                                pointerEvents: isActive ? "auto" : "none",
                            }}
                        >
                            <div className="bg-gradient-to-br from-card/95 to-card/60 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                                {/* Quote icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-primary"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Testimonial text */}
                                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                                    "{t.quote}"
                                </p>

                                {/* Author info */}
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-full blur-md opacity-60 animate-pulse" />
                                        <img
                                            src={t.src}
                                            alt={t.name}
                                            className="relative w-20 h-20 rounded-full object-cover border-4 border-background shadow-xl"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-800 mb-1">
                                            {t.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {t.designation}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation arrows */}
            {testimonials.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                        aria-label="Previous testimonial"
                    >
                        <svg
                            className="w-6 h-6 text-primary group-hover:text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                        aria-label="Next testimonial"
                    >
                        <svg
                            className="w-6 h-6 text-primary group-hover:text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Pagination dots */}
            {/* {testimonials.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`transition-all duration-300 rounded-full ${idx === currentIndex
                                    ? "w-8 h-2 bg-primary"
                                    : "w-2 h-2 bg-primary/30 hover:bg-primary/50"
                                }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
}
