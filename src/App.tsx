/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MDMessagePage } from './pages/MDMessagePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { CustomersPage } from './pages/CustomersPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MobileBottomBar } from './components/MobileBottomBar';

function PageRouter() {
  const { currentPage } = useApp();

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'md-message':
      return <MDMessagePage />;
    case 'services':
      return <ServicesPage />;
    case 'products':
      return <ProductsPage />;
    case 'customers':
      return <CustomersPage />;
    case 'projects':
      return <ProjectsPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

function MainLayout() {
  const { navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#e52424] selection:text-white font-sans antialiased">
      {/* Executive Navbar with Top Contact Bar & Solid Dark Nav with Active Pips */}
      <Navbar />

      {/* Main Dynamic Multi-Page Router */}
      <main className="flex-grow pb-14 md:pb-0">
        <PageRouter />
      </main>

      {/* Executive Footer */}
      <Footer />

      {/* Admin Dashboard */}
      <AdminDashboard />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
