import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import MentionsLegales from './pages/MentionsLegales';
import CloturesPortails from './pages/services/CloturesPortails';
import TerrassesDallage from './pages/services/TerrassesDallage';
import GazonSynthetique from './pages/services/GazonSynthetique';
import MaconneriePaysagere from './pages/services/MaconneriePaysagere';
import ConstructionsBois from './pages/services/ConstructionsBois';
import CreationJardins from './pages/services/CreationJardins';
import EntretienEspacesVerts from './pages/services/EntretienEspacesVerts';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/clotures-portails" element={<CloturesPortails />} />
          <Route path="/services/terrasses-dallage" element={<TerrassesDallage />} />
          <Route path="/services/gazon-synthetique" element={<GazonSynthetique />} />
          <Route path="/services/maconnerie-paysagere" element={<MaconneriePaysagere />} />
          <Route path="/services/constructions-bois" element={<ConstructionsBois />} />
          <Route path="/services/creation-jardins" element={<CreationJardins />} />
          <Route path="/services/entretien-espaces-verts" element={<EntretienEspacesVerts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
