import { Footer } from "./layout/Footer";
import { FloatingNavbar } from "./layout/FloatingNavbar";
import { TopNavbar } from "./layout/TopNavbar";
import { AboutSection } from "./sections/AboutSection";
import { HeroSection } from "./sections/HeroSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ContactSection } from "./sections/ContactSection";
import { BlogSection } from "./sections/BlogSection";


function PortfolioContent() {
  return (
    <>
      <TopNavbar />
      <FloatingNavbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />
      {/* 
      <ExperienceSection />
      <EducationSection />
      
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
       */}
      <Footer />
    </>
  );
}

export default PortfolioContent;
