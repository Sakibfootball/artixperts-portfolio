// app/components/HeroSection.tsx
import { ChevronDown, Eye, Send } from "lucide-react";

export async function HeroSection() {
  //   const data = await getHeroData();

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-gray-900"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 font-space">
            <span
              className="inline-block animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              🚀
            </span>{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-purple-300 to-teal-300 animate-gradient">
              {"ArtiXperts"}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-md">
            We transform{" "}
            <span className="font-medium animate-pulse text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">
              ideas{" "}
            </span>
            into{" "}
            <span className="font-medium animate-pulse text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-teal-600">
              digital experiences
            </span>{" "}
            that{" "}
            <span className="font-medium animate-pulse text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-indigo-600">
              inspire{" "}
            </span>{" "}
            and{" "}
            <span className="font-medium animate-pulse text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">
              engage
            </span>
            .
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#projects"
              className="px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-full font-bold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30"
              data-cursor-hover
            >
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                {"View Portfolio"}
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-full font-bold hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              data-cursor-hover
            >
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                {"Let's Talk"}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="animate-bounce inline-flex flex-col items-center text-white/70">
          <span className="text-sm mb-1">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}
