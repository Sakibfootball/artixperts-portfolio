"use server";

import { writeClient } from "@/sanity/lib/write-client";

export async function submitContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "Please fill in all required fields." };
    }

    try {
        await writeClient.create({
            _type: "contact",
            name,
            email,
            message,
            submittedAt: new Date().toISOString(),
            status: "new",
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting contact form:", error);
        return { success: false, error: "Failed to send message. Please try again." };
    }
}
