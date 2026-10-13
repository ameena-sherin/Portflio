import React, { useState, useRef } from 'react';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { ThreeWorldCanvas, ThreeWorldCanvasRef } from './components/ThreeWorldCanvas';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Internships } from './components/Internships';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { CertificateModal } from './components/CertificateModal';
import { Project, Internship, CertificationItem } from './types';

export function App() {
  const threeWorldRef = useRef<ThreeWorldCanvasRef | null>(null);

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<CertificationItem | null>(null);

  const handleOpenCertificate = (internship?: Internship, certification?: CertificationItem) => {
    setSelectedInternship(internship || null);
    setSelectedCertification(certification || null);
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-slate-100 relative selection:bg-purple-500/30 selection:text-lavender-200 overflow-x-hidden font-sans">
      {/* Background ambient lighting and star canvas */}
      <BackgroundEffects />

      {/* Modern custom desktop pointer with subtle magnetic effect */}
      <CustomCursor />

      {/* Pinned Top Navigation Bar & Floating Social Bar */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Unified 3D Continuous Story Canvas (Ameena 3D character, lighting, workstation & particles) */}
      <ThreeWorldCanvas ref={threeWorldRef} initialMood="lavender" />

      {/* Main Continuous Journey Sections */}
      <main className="relative z-20">
        {/* Section 1: Hero */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* Section 2: About Me (Character glides right) */}
        <About />

        {/* Section 3: My Internships (Character enters workstation, sits & types) */}
        <Internships
          onSelectInternship={(internship) => handleOpenCertificate(internship, undefined)}
        />

        {/* Section 4: My Work (3D project gallery with actual screenshots) */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Section 5: My Tech Stack (Floating 3D interactive spheres) */}
        <TechStack />

        {/* Section 6: Certifications & Learning (13 verified achievements) */}
        <Certifications
          onSelectCertification={(cert) => handleOpenCertificate(undefined, cert)}
        />

        {/* Section 7: Contact & Final Animation / Thank You */}
        <Contact />
      </main>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Certificate Viewer Modal */}
      <CertificateModal
        isOpen={Boolean(selectedInternship || selectedCertification)}
        onClose={() => {
          setSelectedInternship(null);
          setSelectedCertification(null);
        }}
        internship={selectedInternship}
        certification={selectedCertification}
      />

      {/* Full Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
