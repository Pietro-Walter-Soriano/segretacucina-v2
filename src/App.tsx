import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollJourneyHero from "./components/ScrollJourneyHero";
import Info from "./pages/Info";
import Eventi from "./pages/Eventi";
import Prenota from "./pages/Prenota";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ScrollJourneyHero />} />
        <Route path="/info" element={<Info />} />
        <Route path="/eventi" element={<Eventi />} />
        <Route path="/prenota" element={<Prenota />} />
      </Routes>
    </BrowserRouter>
  );
}
