import { Footer } from "./layout/Footer";
import { AboutSection } from "./sections/AboutSection";
import { HeroSection } from "./sections/HeroSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { ContactSection } from "./sections/ContactSection";


function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
      {/* 
      <ExperienceSection />
      <EducationSection />
      
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <BlogSection />
       */}
      <Footer />
    </>
  );
}

export default PortfolioContent;
