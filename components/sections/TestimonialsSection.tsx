import { defineQuery } from "next-sanity";

import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";

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
    <section id="testimonials" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground">
            What people say about working with me
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formattedTestimonials.map((t: any, idx: number) => (
            <div key={idx} className="bg-card border rounded-lg p-6 shadow-sm">
              <p className="text-muted-foreground mb-4">"{t.quote}"</p>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.designation}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
