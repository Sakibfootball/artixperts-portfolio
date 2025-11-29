import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Globe, Github, Clock, Layers } from "lucide-react";
import { PortableText } from "@portabletext/react";

const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  heroImage,
  overview,
  role,
  timeline,
  techStack,
  demoUrl,
  githubUrl,
  content,
  _createdAt
}`);

export default async function CaseStudyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: caseStudy } = await sanityFetch({
        query: CASE_STUDY_QUERY,
        params: { slug },
    });

    if (!caseStudy) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Case Study Not Found</h1>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return to Projects
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-end pb-20 overflow-hidden bg-muted/20">
                {/* Background Image with Gradient Overlay */}
                {caseStudy.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={urlFor(caseStudy.heroImage).url()}
                            alt={caseStudy.heroImage.alt || caseStudy.title}
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
                        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
                    </div>
                )}

                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors bg-background/50 backdrop-blur-md px-4 py-2 rounded-full border border-border/50"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>

                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                            {caseStudy.title}
                        </h1>
                        {caseStudy.overview && (
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                                {caseStudy.overview}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4">
                            {caseStudy.demoUrl && (
                                <a
                                    href={caseStudy.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-all hover:scale-105"
                                >
                                    <Globe className="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                            )}
                            {caseStudy.githubUrl && (
                                <a
                                    href={caseStudy.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-3 bg-card text-card-foreground border border-border rounded-full font-medium hover:bg-muted transition-all hover:scale-105"
                                >
                                    <Github className="w-4 h-4 mr-2" />
                                    View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Metadata Grid */}
            <section className="border-y border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
                <div className="container mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground text-sm font-medium uppercase tracking-wider">
                                <User className="w-4 h-4 mr-2" />
                                Role
                            </div>
                            <p className="font-semibold text-foreground">{caseStudy.role || "Lead Developer"}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center text-muted-foreground text-sm font-medium uppercase tracking-wider">
                                <Clock className="w-4 h-4 mr-2" />
                                Timeline
                            </div>
                            <p className="font-semibold text-foreground">{caseStudy.timeline || "Ongoing"}</p>
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-2">
                            <div className="flex items-center text-muted-foreground text-sm font-medium uppercase tracking-wider">
                                <Layers className="w-4 h-4 mr-2" />
                                Tech Stack
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.techStack ? (
                                    caseStudy.techStack.map((tech: string) => (
                                        <span key={tech} className="px-2 py-1 bg-muted rounded-md text-xs font-medium">
                                            {tech}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-muted-foreground italic">Not specified</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-img:shadow-xl max-w-none">
                        <PortableText
                            value={caseStudy.content}
                            components={{
                                block: {
                                    h1: ({ children }) => (
                                        <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-foreground leading-tight">
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children }) => (
                                        <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-foreground leading-snug">
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children }) => (
                                        <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-foreground">
                                            {children}
                                        </h3>
                                    ),
                                    h4: ({ children }) => (
                                        <h4 className="text-lg md:text-xl font-bold mt-6 mb-3 text-foreground">
                                            {children}
                                        </h4>
                                    ),
                                    normal: ({ children }) => (
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                            {children}
                                        </p>
                                    ),
                                    blockquote: ({ children }) => (
                                        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-foreground bg-muted/30 rounded-r-lg">
                                            {children}
                                        </blockquote>
                                    ),
                                },
                                list: {
                                    bullet: ({ children }) => (
                                        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-muted-foreground marker:text-primary">
                                            {children}
                                        </ul>
                                    ),
                                    number: ({ children }) => (
                                        <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-muted-foreground marker:text-primary font-medium">
                                            {children}
                                        </ol>
                                    ),
                                },
                                marks: {
                                    strong: ({ children }) => (
                                        <strong className="font-bold text-foreground">{children}</strong>
                                    ),
                                    em: ({ children }) => (
                                        <em className="italic text-foreground">{children}</em>
                                    ),
                                    code: ({ children }) => (
                                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary font-medium">
                                            {children}
                                        </code>
                                    ),
                                    textColor: ({ children, value }) => (
                                        <span style={{ color: value.value }}>{children}</span>
                                    ),
                                    link: ({ children, value }) => {
                                        const rel = !value.href.startsWith("/")
                                            ? "noreferrer noopener"
                                            : undefined;
                                        return (
                                            <Link
                                                href={value.href}
                                                rel={rel}
                                                className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
                                            >
                                                {children}
                                            </Link>
                                        );
                                    },
                                },
                                types: {
                                    image: ({ value }) => (
                                        <div className="my-12 group">
                                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted shadow-2xl border border-border/50 transition-transform duration-500 group-hover:scale-[1.01]">
                                                <Image
                                                    src={urlFor(value).url()}
                                                    alt={value.alt || "Project screenshot"}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            {value.caption && (
                                                <p className="text-center text-sm text-muted-foreground mt-4 italic">
                                                    {value.caption}
                                                </p>
                                            )}
                                        </div>
                                    ),
                                    code: ({ value }) => (
                                        <div className="my-8 rounded-lg overflow-hidden border border-border bg-[#1e1e1e] text-white shadow-xl">
                                            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#3d3d3d]">
                                                <span className="text-xs font-mono text-gray-400">
                                                    {value.filename || "Code"}
                                                </span>
                                                <div className="flex gap-1.5">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                                                </div>
                                            </div>
                                            <div className="p-4 overflow-x-auto">
                                                <pre className="font-mono text-sm leading-relaxed">
                                                    <code>{value.code}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ),
                                    table: ({ value }) => (
                                        <div className="my-8 overflow-x-auto rounded-lg border border-border shadow-sm">
                                            <table className="w-full text-left text-sm">
                                                <thead className="bg-muted/50 text-foreground">
                                                    <tr>
                                                        {value.rows[0].cells.map((cell: string, i: number) => (
                                                            <th key={i} className="px-4 py-3 font-semibold">
                                                                {cell}
                                                            </th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-border">
                                                    {value.rows.slice(1).map((row: any, i: number) => (
                                                        <tr key={i} className="hover:bg-muted/20 transition-colors">
                                                            {row.cells.map((cell: string, j: number) => (
                                                                <td key={j} className="px-4 py-3 text-muted-foreground">
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ),
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Next Project Navigation (Placeholder) */}
            <section className="py-20 border-t border-border bg-muted/30">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl font-bold mb-8">Ready to see more?</h2>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center px-8 py-4 bg-foreground text-background rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                        View All Projects
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
