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

async function checkServices() {
    try {
        const services = await client.fetch(`*[_type == "service"]{title, "slug": slug.current, "hasIcon": defined(icon)}`);
        console.log("Services status:");
        services.forEach((s: any) => {
            console.log(`- ${s.title} (${s.slug}): ${s.hasIcon ? "Has Icon" : "NO ICON"}`);
        });
    } catch (error) {
        console.error("Error checking services:", error);
    }
}

checkServices();
