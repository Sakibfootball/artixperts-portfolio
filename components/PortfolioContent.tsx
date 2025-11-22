import { Footer } from "./layout/Footer";
import { AboutSection } from "./sections/AboutSection";
import { HeroSection } from "./sections/HeroSection";
import { SkillsSection } from "./sections/SkillsSection";
import { ProjectsSection } from "./sections/ProjectsSection";


function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      {/* <TestimonialsSection />
      <ExperienceSection />
      <EducationSection />
      
      <CertificationsSection />
      <AchievementsSection />
      <ServicesSection />
      <BlogSection />
      <ContactSection /> */}
      <ProjectsSection />
      <Footer />
    </>
  );
}

export default PortfolioContent;
