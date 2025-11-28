import fs from "fs";
import path from "path";

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

async function createDummyCaseStudy() {
    try {
        // Dynamically import writeClient to ensure env vars are loaded first
        const { writeClient } = await import("../sanity/lib/write-client");
        console.log("Creating dummy case study...");

        const caseStudy = {
            _type: "caseStudy",
            title: "Revamping E-Commerce Experience",
            heroImage: {
                _type: "image",
                // Skipping asset reference as we don't have a valid image ID. 
                // Sanity might complain if required, but let's try creating without asset first 
                // or we might need to upload one if validation is strict.
                // For now, I'll just omit the asset field to see if it allows empty image object.
            },
            content: [
                {
                    _type: "block",
                    style: "h2",
                    children: [{ _type: "span", text: "The Challenge" }],
                },
                {
                    _type: "block",
                    style: "normal",
                    children: [
                        {
                            _type: "span",
                            text: "The client needed a complete overhaul of their legacy e-commerce platform. The existing site was slow, not mobile-responsive, and difficult to manage.",
                        },
                    ],
                },
                {
                    _type: "block",
                    style: "h2",
                    children: [{ _type: "span", text: "The Solution" }],
                },
                {
                    _type: "block",
                    style: "normal",
                    children: [
                        {
                            _type: "span",
                            text: "We implemented a headless architecture using Next.js and Sanity. This allowed for lightning-fast page loads and a flexible content management experience.",
                        },
                    ],
                },
                {
                    _type: "block",
                    style: "h2",
                    children: [{ _type: "span", text: "Results" }],
                },
                {
                    _type: "block",
                    style: "normal",
                    children: [
                        {
                            _type: "span",
                            text: "Conversion rates increased by 40% and page load times dropped by 60%.",
                        },
                    ],
                }
            ],
        };

        // If heroImage is required and we don't have an asset, we might need to remove the field entirely 
        // if the schema allows it to be optional. 
        // My schema said validation: (Rule) => Rule.required(), so it IS required.
        // However, I can't easily upload an image from here without a file.
        // I will try to create it. If it fails, I will tell the user to add an image manually.
        // Or I can try to find an existing image asset ID from the project.

        // Let's try to fetch an existing image asset first.
        const existingImage = await writeClient.fetch('*[_type == "sanity.imageAsset"][0]._id');
        if (existingImage) {
            console.log("Found existing image asset:", existingImage);
            (caseStudy.heroImage as any).asset = {
                _type: "reference",
                _ref: existingImage
            };
        } else {
            console.log("No existing image asset found. Creation might fail if heroImage is required.");
            // If no image, we might fail validation.
        }

        const result = await writeClient.create(caseStudy);
        console.log("Case Study created with ID:", result._id);
        console.log("You can now link this Case Study to a Project in Sanity Studio.");

    } catch (error) {
        console.error("Error creating case study:", error);
    }
}

createDummyCaseStudy();
