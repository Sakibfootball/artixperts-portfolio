import Link from "next/link";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { ContactForm } from "./ContactForm";

const PROFILE_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  email,
  phone,
  location,
  socialLinks
}`);

export async function ContactSection() {
  const { data: profile } = await sanityFetch({ query: PROFILE_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-teal-900 z-0"></div>

      {/* Animated Floating Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Noise/Grain Texture Overlay */}
      <div className="absolute inset-0 opacity-10 z-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-space">
              Let's Build Something Amazing
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Let's collaborate and create something extraordinary together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div className="text-white space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Get In Touch</h3>
                  <p className="text-white/80 leading-relaxed">
                    Have a project in mind? Whether it's a stunning website, mobile app, or complete branding - we're here to help bring your vision to life.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {/* Email */}
                  {profile.email && (
                    <Link
                      href={`mailto:${profile.email}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-lg mb-1">Email Us</h4>
                        <p className="opacity-90 text-sm truncate">{profile.email}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  )}

                  {/* Phone */}
                  {profile.phone && (
                    <Link
                      href={`tel:${profile.phone}`}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-lg mb-1">Call Us</h4>
                        <p className="opacity-90 text-sm">{profile.phone}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  )}

                  {/* Location */}
                  {profile.location && (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-1">Based In</h4>
                        <p className="opacity-90 text-sm">{profile.location}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Social Links */}
              {profile.socialLinks && (
                <div className="pt-4">
                  <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
                  <div className="flex flex-wrap gap-3">
                    {profile.socialLinks.linkedin && (
                      <Link
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                      >
                        LinkedIn
                      </Link>
                    )}
                    {profile.socialLinks.github && (
                      <Link
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                      >
                        GitHub
                      </Link>
                    )}
                    {profile.socialLinks.twitter && (
                      <Link
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm font-medium"
                      >
                        Twitter
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Contact Form with Glassmorphism */}
            <div className="relative group">
              {/* Glow effect behind the form */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 to-teal-500/50 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Form Card */}
              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:-translate-y-2 border border-white/20">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
