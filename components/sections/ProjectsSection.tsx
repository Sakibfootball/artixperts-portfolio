import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { defineQuery } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

const PROJECTS_QUERY = defineQuery(`*[_type == "project" && featured == true] | order(order asc)[0...6]{
  title,
  slug,
  tagline,
  category,
  liveUrl,
  githubUrl,
  coverImage,
  technologies[]->{name, category, color}
}`);

export async function ProjectsSection() {
  const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY });

  // Fallback projects for when Sanity data is not available
  const fallbackProjects = [
    {
      title: "E-commerce Platform",
      tagline: "Full-stack development with React & Node.js",
      coverImage: null,
      slug: { current: "ecommerce-platform" },
    },
    {
      title: "Startup Business Portal",
      tagline: "Custom SaaS platform for entrepreneurs",
      coverImage: null,
      slug: { current: "startup-portal" },
    },
    {
      title: "Creative Agency Branding",
      tagline: "Complete visual identity and website",
      coverImage: null,
      slug: { current: "agency-branding" },
    },
    {
      title: "Mobile App UX Design",
      tagline: "User experience overhaul for fintech app",
      coverImage: null,
      slug: { current: "mobile-ux" },
    },
    {
      title: "Corporate Dashboard",
      tagline: "Data visualization and analytics interface",
      coverImage: null,
      slug: { current: "corporate-dashboard" },
    },
    {
      title: "E-commerce Redesign",
      tagline: "Conversion-focused UI/UX improvements",
      coverImage: null,
      slug: { current: "ecommerce-redesign" },
    },
  ];

  const displayProjects = projects && projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 font-space">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gray-300 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project: any) => (
            <Link
              key={project.slug?.current || project.title}
              href={project.liveUrl || "#"}
              className="group relative overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                {project.coverImage ? (
                  <Image
                    src={urlFor(project.coverImage).width(640).height(360).url()}
                    alt={project.coverImage.alt || project.title || "Project image"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 via-gray-100 to-teal-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Project Image</span>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {project.title || "Untitled Project"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.tagline || "Project description"}
                </p>
                <span className="inline-flex items-center text-purple-600 font-medium">
                  View Case Study{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
