import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import PostPage from './pages/PostPage';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          {/* Default redirect to Turkish */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="post/*" element={<PostPage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsOfService />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </Router>
  );
}

export default App;
