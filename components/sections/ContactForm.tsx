"use client";

import { useState, useTransition } from "react";
import { Send } from "lucide-react";
import { submitContactForm } from "@/app/actions/submit-contact-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset the form
        (e.target as HTMLFormElement).reset();
        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        setStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    });
  };

  return (
    <>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 font-space">Send a Message</h3>

      {status.type && (
        <div
          className={`mb-6 p-4 rounded-lg text-sm ${status.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
            }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
            required
            disabled={isPending}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Project Details
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about your project..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 resize-none"
            required
            disabled={isPending}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-purple-600 to-teal-600 text-white py-4 px-6 rounded-lg font-bold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
}
