import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, Leaf } from 'lucide-react';
import { SERVICES, COMPANY } from '../data/services';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  const headerBase = isHome && !scrolled
    ? 'bg-transparent text-white'
    : 'bg-white text-stone-800 shadow-md';

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${headerBase}`}>
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="MAZEAS Paysages - Accueil">
            <div className="w-9 h-9 rounded-full bg-primary-700 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <div className={`font-bold text-lg ${isHome && !scrolled ? 'text-white' : 'text-primary-900'}`}>
                MAZEAS Paysages
              </div>
              <div className={`text-xs hidden sm:block ${isHome && !scrolled ? 'text-green-200' : 'text-stone-500'}`}>
                Paysagiste Loire-Atlantique
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            <NavLink to="/" className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''} ${isHome && !scrolled ? 'text-white hover:text-green-200' : ''}`
            }>Accueil</NavLink>

            {/* Services dropdown */}
            <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className={`nav-link flex items-center gap-1 ${isHome && !scrolled ? 'text-white hover:text-green-200' : ''}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Nos Services <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50">
                  {SERVICES.map(s => (
                    <Link
                      key={s.id}
                      to={s.slug}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary-50 text-stone-700 hover:text-primary-800 transition-colors"
                    >
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-sm font-medium">{s.title}</span>
                    </Link>
                  ))}
                  <div className="border-t border-stone-100 mt-2 pt-2 px-4">
                    <Link to="/services" className="text-sm text-primary-700 hover:text-primary-800 font-semibold">
                      Voir tous les services →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/contact" className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''} ${isHome && !scrolled ? 'text-white hover:text-green-200' : ''}`
            }>Contact</NavLink>
          </nav>

          {/* CTA phone */}
          <a
            href={COMPANY.phoneTel}
            className="hidden lg:flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
            aria-label={`Appeler MAZEAS Paysages au ${COMPANY.phone}`}
          >
            <Phone className="w-4 h-4" />
            {COMPANY.phone}
          </a>

          {/* Mobile: phone + burger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={COMPANY.phoneTel}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-700 text-white"
              aria-label={`Appeler MAZEAS Paysages au ${COMPANY.phone}`}
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={`p-2 rounded-lg ${isHome && !scrolled ? 'text-white hover:bg-white/10' : 'text-stone-700 hover:bg-stone-100'}`}
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 shadow-lg">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Menu mobile">
            <Link to="/" className="px-4 py-3 rounded-lg hover:bg-primary-50 text-stone-800 font-medium">Accueil</Link>
            <div className="px-4 py-2 text-xs font-semibold text-stone-400 uppercase tracking-wider mt-2">Nos Services</div>
            {SERVICES.map(s => (
              <Link key={s.id} to={s.slug} className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-primary-50 text-stone-700">
                <span>{s.icon}</span>
                <span className="text-sm font-medium">{s.title}</span>
              </Link>
            ))}
            <div className="border-t border-stone-100 mt-2 pt-2">
              <Link to="/contact" className="flex items-center px-4 py-3 rounded-lg hover:bg-primary-50 text-stone-800 font-medium">Contact</Link>
              <a
                href={COMPANY.phoneTel}
                className="flex items-center gap-2 mx-4 mt-2 btn-call justify-center"
              >
                <Phone className="w-4 h-4" /> Appeler maintenant
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
