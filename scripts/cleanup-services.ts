import fs from "fs";
import path from "path";
import { createClient } from 'next-sanity';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/"/g, "");
        }
    });
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

const slugsToDelete = [
    "full-stack-development",
    "ai-integration"
];

async function cleanupServices() {
    try {
        console.log("Starting cleanup...");

        for (const slug of slugsToDelete) {
            const existing = await client.fetch(`*[_type == "service" && slug.current == $slug]`, { slug });
            if (existing.length > 0) {
                for (const doc of existing) {
                    await client.delete(doc._id);
                    console.log(`Deleted service: ${doc.title} (${slug}) - ID: ${doc._id}`);
                }
            } else {
                console.log(`Service not found: ${slug}`);
            }
        }

        console.log("Cleanup complete!");
    } catch (error) {
        console.error("Error cleaning up services:", error);
    }
}

cleanupServices();
