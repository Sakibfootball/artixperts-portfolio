import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Bookmark } from "lucide-react";
import { PortableText } from "@portabletext/react";

const BLOG_POST_QUERY = defineQuery(`*[_type == "blog" && slug.current == $slug][0]{
  title,
  excerpt,
  featuredImage,
  content,
  publishedAt,
  readTime,
  category,
  tags,
  _createdAt
}`);

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: post } = await sanityFetch({
        query: BLOG_POST_QUERY,
        params: { slug },
    });

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold">Post Not Found</h1>
                    <p className="text-muted-foreground">The blog post you are looking for does not exist.</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20">
            {/* Progress Bar (Optional - could be added with client component) */}

            {/* Header / Navigation */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link
                        href="/#blog"
                        className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>

                    <div className="flex items-center gap-4">
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                            <Bookmark className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            <article className="pt-24 pb-20">
                {/* Article Header */}
                <div className="container mx-auto px-4 max-w-4xl mb-12">
                    <div className="space-y-6 text-center">
                        {post.category && (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                {post.category}
                            </span>
                        )}

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                {post.excerpt}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground pt-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(post.publishedAt || post._createdAt)}</span>
                            </div>
                            {post.readTime && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{post.readTime} min read</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.featuredImage && (
                    <div className="container mx-auto px-4 max-w-5xl mb-16">
                        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={urlFor(post.featuredImage).url()}
                                alt={post.featuredImage.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {post.featuredImage.caption && (
                            <p className="text-center text-sm text-muted-foreground mt-4">
                                {post.featuredImage.caption}
                            </p>
                        )}
                    </div>
                )}

                {/* Article Content */}
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl max-w-none">
                        {post.content ? (
                            <PortableText
                                value={post.content}
                                components={{
                                    marks: {
                                        textColor: ({ children, value }) => (
                                            <span style={{ color: value.value }}>{children}</span>
                                        ),
                                    },
                                    types: {
                                        image: ({ value }) => (
                                            <div className="my-8">
                                                <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                                                    <Image
                                                        src={urlFor(value).url()}
                                                        alt={value.alt || "Blog image"}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {value.caption && (
                                                    <p className="text-center text-sm text-muted-foreground mt-2">
                                                        {value.caption}
                                                    </p>
                                                )}
                                            </div>
                                        ),
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-muted-foreground italic">No content available for this post yet.</p>
                        )}
                    </div>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-16 pt-8 border-t border-border">
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm hover:bg-muted/80 transition-colors cursor-default"
                                    >
                                        <Tag className="w-3 h-3 mr-2" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>
        </main>
    );
}
