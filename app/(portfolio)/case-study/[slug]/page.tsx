import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";

const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  heroImage,
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
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4 font-space">Case Study Not Found</h1>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 selection:bg-purple-500/30">
            {/* Premium Hero Section */}
            <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
                {/* Background Image with Overlay */}
                {caseStudy.heroImage && (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={urlFor(caseStudy.heroImage).url()}
                            alt={caseStudy.heroImage.alt || caseStudy.title}
                            fill
                            className="object-cover opacity-40"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/80 to-gray-900"></div>
                    </div>
                )}

                {/* Animated Blobs */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                {/* Hero Content */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-space tracking-tight leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                            {caseStudy.title}
                        </span>
                    </h1>

                    <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm md:text-base">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span>{new Date(caseStudy._createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-teal-400" />
                            <span>Adil Bhai</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-indigo-400" />
                            <span>Case Study</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                        <div className="prose prose-lg dark:prose-invert prose-purple max-w-none">
                            <PortableText
                                value={caseStudy.content}
                                components={{
                                    marks: {
                                        textColor: ({ children, value }) => (
                                            <span style={{ color: value.value }}>{children}</span>
                                        ),
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
