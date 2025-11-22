import { Code, Layout, PenTool } from "lucide-react";

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 font-space">
            My Skills
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-teal-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Web Development */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Code className="text-purple-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Web Development
            </h3>
            <p className="text-gray-600 mb-4">
              Building responsive, performant websites and web applications with
              modern technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                HTML/CSS
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                JavaScript
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                React
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                Node.js
              </span>
            </div>
          </div>

          {/* UI/UX Design */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
              <Layout className="text-teal-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              UI/UX Design
            </h3>
            <p className="text-gray-600 mb-4">
              Creating intuitive interfaces with user experience at the forefront
              of the design process.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
                Figma
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
                Adobe XD
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
                User Research
              </span>
              <span className="px-3 py-1 bg-teal-50 text-teal-600 rounded-full text-sm">
                Prototyping
              </span>
            </div>
          </div>

          {/* Graphic Design */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <PenTool className="text-purple-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Graphic Design
            </h3>
            <p className="text-gray-600 mb-4">
              Crafting visual identities, branding, and marketing materials that
              stand out.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                Photoshop
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                Illustrator
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                Branding
              </span>
              <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                Print Design
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
