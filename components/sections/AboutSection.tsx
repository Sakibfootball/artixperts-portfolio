import Image from "next/image";
import {
  Award,
  ArrowRight,
} from "lucide-react";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";

const ABOUT_QUERY = defineQuery(`{
  "profile": *[_id == "singleton-profile"][0]{
    profileImage,
    shortBio
  },
  "services": *[_type == "service" && defined(icon)]|order(order asc)[0...4]{
    title,
    icon
  }
}`);

export async function AboutSection() {
  const { data } = await sanityFetch({ query: ABOUT_QUERY });
  const { profile, services } = data || {};

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="w-full h-96 bg-linear-to-r from-purple-100 to-teal-100 rounded-2xl overflow-hidden relative">
                {profile?.profileImage ? (
                  <Image
                    src={urlFor(profile.profileImage).url()}
                    alt="About me"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-linear-to-r from-purple-500 to-teal-500 p-1 rounded-lg">
                <div className="bg-white p-3 rounded-md shadow-lg">
                  <Award className="text-purple-500 w-8 h-8" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-space">
              About Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {services?.map((service: any) => (
                <div key={service.title} className="flex flex-col gap-2 p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden relative">
                      {service.icon ? (
                        <Image
                          src={urlFor(service.icon).url()}
                          alt={service.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-purple-100" />
                      )}
                    </div>
                    <span className="font-bold text-gray-800">{service.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-all duration-300 hover:translate-x-1"
            >
              Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
