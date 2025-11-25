import { defineQuery } from "next-sanity";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial" && featured == true] | order(order asc){
  name,
  position,
  company,
  testimonial,
  rating,
  date,
  avatar,
  companyLogo,
  linkedinUrl
}`);

export async function TestimonialsSection() {
  const { data: testimonials } = await sanityFetch({
    query: TESTIMONIALS_QUERY,
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Map Sanity testimonials to format
  const formattedTestimonials = testimonials.map((testimonial: any) => ({
    quote: testimonial.testimonial || "",
    name: testimonial.name || "Anonymous",
    designation: testimonial.company
      ? `${testimonial.position} at ${testimonial.company}`
      : testimonial.position || "",
    src: testimonial.avatar
      ? urlFor(testimonial.avatar).width(500).height(500).url()
      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop",
  }));

  return (
    <section id="testimonials" className="py-20 px-6 relative overflow-hidden">
      {/* Background gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 font-space">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What people say about working with us
          </p>
        </div>

        <TestimonialsCarousel testimonials={formattedTestimonials} />
      </div>
    </section>
  );
}
