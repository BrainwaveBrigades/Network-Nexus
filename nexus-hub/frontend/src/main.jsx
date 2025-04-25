import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';

// Import pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import KnowledgeHub from './pages/KnowledgeHub';
import HallOfFame from './pages/HallOfFame';
import Internship from './pages/Internship';
import Events from './pages/Events';
import Alumni from './pages/Alumni';
import Mentorship from './pages/Mentorship';

// Set up React Query client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Home page */}
          <Route path="/" element={<Index />} />
          
          {/* Feature pages */}
          <Route path="/NexusHub/knowledge-Hub" element={<KnowledgeHub />} />
          <Route path="/NexusHub/hall-Of-Fame" element={<HallOfFame />} />
          <Route path="/NexusHub/internships" element={<Internship />} />
          <Route path="/NexusHub/alumni" element={<Alumni />} />
          <Route path="/NexusHub/events" element={<Events />} />
          <Route path="/NexusHub/mentorship" element={<Mentorship />} />
          
          {/* Handle 404 errors */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
); 