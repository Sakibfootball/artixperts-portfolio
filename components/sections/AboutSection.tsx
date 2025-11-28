import Image from "next/image";
import {
  Award,
  Code,
  PenTool,
  Image as LucideImage,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export async function AboutSection() {
  const profile = await client.fetch(`*[_type == "profile"][0]{ profileImage }`);

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
            <p className="text-gray-600 mb-6">
              We’re a team of creators, strategists, and problem solvers helping
              businesses look sharper, sound clearer, and grow faster. From
              stunning visuals to smart marketing, we bring together design,
              storytelling, and strategy to move your brand forward.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Code className="text-purple-500 w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Web Development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <PenTool className="text-teal-500 w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">UI/UX Design</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <LucideImage className="text-purple-500 w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Graphic Design</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                  <Smartphone className="text-teal-500 w-5 h-5" />
                </div>
                <span className="font-medium text-gray-700">Mobile Apps</span>
              </div>
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
