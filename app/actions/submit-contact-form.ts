"use server";
"use server";

export async function submitContactForm(formData: FormData) {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate success
    return { success: true, error: undefined };
}
