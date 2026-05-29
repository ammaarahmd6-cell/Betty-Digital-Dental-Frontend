import { NavLink, Link } from 'react-router-dom';
import { FaBars, FaChevronDown, FaTooth, FaUserCircle } from 'react-icons/fa';
import { productCategories } from '../data/siteData';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { patient } = useAuth();

  return (
    <nav className="navbar navbar-expand-xl sticky-top site-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="brand-mark"><FaTooth /></span>
          <span>
            <strong>Betty Digital</strong>
            <small>Dental Solutions</small>
          </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-xl-center">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle d-flex align-items-center gap-1" to="/products" role="button" data-bs-toggle="dropdown">
                Products <FaChevronDown size={10} />
              </Link>
              <ul className="dropdown-menu border-0 shadow-lg">
                <li><Link className="dropdown-item fw-semibold" to="/products">All Products</Link></li>
                {productCategories.map((item) => (
                  <li key={item.title}>
                    <Link className="dropdown-item" to={`/products?category=${encodeURIComponent(item.title)}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/services">Services</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/workflow">Workflow</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery">Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/case-studies">Case Studies</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact">Contact</NavLink></li>
          </ul>
          <div className="d-flex flex-wrap gap-2 ms-xl-3 mt-3 mt-xl-0">
            <Link to="/contact" className="btn btn-gradient">Inquiry</Link>
            <Link to={patient ? '/patient/dashboard' : '/patient/login'} className="btn btn-light-blue">
              <FaUserCircle /> {patient ? 'Patient Dashboard' : 'Patient Sign In'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
