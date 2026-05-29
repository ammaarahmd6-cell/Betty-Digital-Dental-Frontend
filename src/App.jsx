import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ProtectedRoute from './components/ProtectedRoute';
import PatientRoute from './components/PatientRoute';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Services from './pages/Services';
import Workflow from './pages/Workflow';
import Gallery from './pages/Gallery';
import Videos from './pages/Videos';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import BlogDetails from './pages/BlogDetails';
import Contact from './pages/Contact';
import Login from './pages/Login';
import PatientLogin from './pages/PatientLogin';
import PatientSignup from './pages/PatientSignup';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminServices from './pages/AdminServices';
import AdminGallery from './pages/AdminGallery';
import AdminBlogs from './pages/AdminBlogs';
import AdminInquiries from './pages/AdminInquiries';
import AdminTestimonials from './pages/AdminTestimonials';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
        ↑
      </button>
    </>
  );
}

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    AOS.init({ duration: 850, once: true, offset: 80 });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/patient/login" element={<PatientLogin />} />
      <Route path="/patient/signup" element={<PatientSignup />} />
      <Route
        path="/patient/dashboard"
        element={
          <PatientRoute>
            <PatientDashboard />
          </PatientRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/services"
        element={
          <ProtectedRoute>
            <AdminServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <AdminGallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/blogs"
        element={
          <ProtectedRoute>
            <AdminBlogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute>
            <AdminInquiries />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <AdminTestimonials />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PublicLayout><PublicRoutes /></PublicLayout>} />
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/workflow" element={<Workflow />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/case-studies" element={<CaseStudies />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/patient/*" element={<Navigate to="/patient/login" replace />} />
      <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}

export default App;
