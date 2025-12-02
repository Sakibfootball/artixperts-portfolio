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

const services = [
    {
        title: "Graphic Design",
        slug: "graphic-design",
        shortDescription: "Visual storytelling through creative design.",
        fullDescription: "We create stunning visuals that communicate your brand's message effectively.",
        imagePath: String.raw`C:\Users\haide\.gemini\antigravity\brain\f517144b-e585-4bc8-8f81-accd08dd8dc4\graphic_design_logo_1764690473730.png`,
        features: ["Logo Design", "Branding", "Marketing Materials"],
        deliverables: ["Vector Files", "High-Res Images", "Brand Guidelines"],
        pricing: { startingPrice: 500, priceType: "project", description: "Starting from $500 for a basic branding package." },
        timeline: "1-2 weeks"
    },
    {
        title: "Mobile Apps",
        slug: "mobile-apps",
        shortDescription: "Native and cross-platform mobile applications.",
        fullDescription: "We build high-performance mobile apps for iOS and Android using the latest technologies.",
        imagePath: String.raw`C:\Users\haide\.gemini\antigravity\brain\f517144b-e585-4bc8-8f81-accd08dd8dc4\mobile_apps_logo_1764690630570.png`,
        features: ["iOS & Android", "React Native / Flutter", "App Store Submission"],
        deliverables: ["Source Code", "App Binaries", "Documentation"],
        pricing: { startingPrice: 3000, priceType: "project", description: "Starting from $3000 for a MVP." },
        timeline: "1-3 months"
    },
    {
        title: "Full-Stack Web Development",
        slug: "full-stack-web-development",
        shortDescription: "End-to-end web solutions.",
        fullDescription: "Robust and scalable web applications built with modern stacks like MERN or Next.js.",
        imagePath: String.raw`C:\Users\haide\.gemini\antigravity\brain\f517144b-e585-4bc8-8f81-accd08dd8dc4\full_stack_dev_logo_1764690784987.png`,
        features: ["Custom Backend", "Responsive Frontend", "Database Design"],
        deliverables: ["Deployed Application", "Source Code", "Admin Panel"],
        pricing: { startingPrice: 2000, priceType: "project", description: "Starting from $2000 for a standard web app." },
        timeline: "4-8 weeks"
    },
    {
        title: "UI/UX Design",
        slug: "ui-ux-design",
        shortDescription: "User-centric interface and experience design.",
        fullDescription: "We design intuitive and engaging user interfaces that provide a seamless user experience.",
        imagePath: String.raw`C:\Users\haide\.gemini\antigravity\brain\f517144b-e585-4bc8-8f81-accd08dd8dc4\ui_ux_design_logo_1764690926388.png`,
        features: ["Wireframing", "Prototyping", "User Research"],
        deliverables: ["Figma Files", "Interactive Prototypes", "Design System"],
        pricing: { startingPrice: 1000, priceType: "project", description: "Starting from $1000 for a website design." },
        timeline: "2-4 weeks"
    },
    {
        title: "AI Integration & Development",
        slug: "ai-integration-development",
        shortDescription: "Leveraging AI for business solutions.",
        fullDescription: "Integrate cutting-edge AI models and automation into your business processes.",
        imagePath: String.raw`C:\Users\haide\.gemini\antigravity\brain\f517144b-e585-4bc8-8f81-accd08dd8dc4\ai_integration_logo_1764691216320.png`,
        features: ["Chatbots", "Predictive Analytics", "Process Automation"],
        deliverables: ["AI Model", "Integration API", "Usage Dashboard"],
        pricing: { startingPrice: 5000, priceType: "project", description: "Custom quotes based on complexity." },
        timeline: "2-6 months"
    }
];

async function seedServices() {
    try {
        console.log("Starting service seed...");

        for (const service of services) {
            console.log(`Processing ${service.title}...`);

            // Find all existing services with this slug
            const existing = await client.fetch(`*[_type == "service" && slug.current == $slug]`, { slug: service.slug });

            let targetId;

            if (existing.length > 0) {
                console.log(`Found ${existing.length} existing services for ${service.title}. Updating first one and removing others...`);
                targetId = existing[0]._id;

                // Delete duplicates if any
                for (let i = 1; i < existing.length; i++) {
                    await client.delete(existing[i]._id);
                    console.log(`Deleted duplicate: ${existing[i]._id}`);
                }
            }

            // Upload image
            let imageAsset;
            if (fs.existsSync(service.imagePath)) {
                console.log(`Uploading image for ${service.title}...`);
                const imageBuffer = fs.readFileSync(service.imagePath);
                imageAsset = await client.assets.upload('image', imageBuffer, {
                    filename: path.basename(service.imagePath)
                });
            } else {
                console.warn(`Image not found at ${service.imagePath}`);
            }

            const doc = {
                _type: 'service',
                title: service.title,
                slug: { _type: 'slug', current: service.slug },
                shortDescription: service.shortDescription,
                fullDescription: [
                    {
                        _type: 'block',
                        style: 'normal',
                        children: [{ _type: 'span', text: service.fullDescription }]
                    }
                ],
                icon: imageAsset ? {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: imageAsset._id
                    }
                } : undefined,
                features: service.features,
                deliverables: service.deliverables,
                pricing: service.pricing,
                timeline: service.timeline,
                featured: true
            };

            if (targetId) {
                // Update existing
                await client.patch(targetId).set(doc).commit();
                console.log(`Updated service: ${service.title} (${targetId})`);
            } else {
                // Create new
                const result = await client.create(doc);
                console.log(`Created service: ${result.title} (${result._id})`);
            }
        }

        console.log("Seeding complete!");
    } catch (error) {
        console.error("Error seeding services:", error);
    }
}

seedServices();
