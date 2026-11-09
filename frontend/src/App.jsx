import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import { AuthProvider } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Programmes from './pages/Programmes';
import Projects from './pages/Projects';
import WhyChooseUs from './pages/WhyChooseUs';
import TeachingMethodology from './pages/TeachingMethodology';
import SchoolPartnerships from './pages/SchoolPartnerships';
import Safety from './pages/Safety';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import EnquiriesManager from './admin/EnquiriesManager';
import ProgrammesManager from './admin/ProgrammesManager';
import ProjectsManager from './admin/ProjectsManager';
import AutomationManager from './admin/AutomationManager';

// Public Layout Wrapper with Navbar & Footer
function PublicLayout({ onOpenDemoModal }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar onOpenDemoModal={onOpenDemoModal} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer onOpenDemoModal={onOpenDemoModal} />
    </div>
  );
}

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const openDemoModal = () => setDemoModalOpen(true);
  const closeDemoModal = () => setDemoModalOpen(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Global Demo Request Modal */}
        <DemoModal isOpen={demoModalOpen} onClose={closeDemoModal} />

        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout onOpenDemoModal={openDemoModal} />}>
            <Route path="/" element={<Home onOpenDemoModal={openDemoModal} />} />
            <Route path="/about" element={<AboutUs onOpenDemoModal={openDemoModal} />} />
            <Route path="/programmes" element={<Programmes onOpenDemoModal={openDemoModal} />} />
            <Route path="/projects" element={<Projects onOpenDemoModal={openDemoModal} />} />
            <Route path="/why-choose-us" element={<WhyChooseUs onOpenDemoModal={openDemoModal} />} />
            <Route path="/methodology" element={<TeachingMethodology onOpenDemoModal={openDemoModal} />} />
            <Route path="/partnerships" element={<SchoolPartnerships onOpenDemoModal={openDemoModal} />} />
            <Route path="/safety" element={<Safety onOpenDemoModal={openDemoModal} />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="enquiries" element={<EnquiriesManager />} />
            <Route path="programmes" element={<ProgrammesManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="automations" element={<AutomationManager />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
