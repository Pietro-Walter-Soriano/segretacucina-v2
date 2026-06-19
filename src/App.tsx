import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Esplora from "./pages/Esplora";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/esplora" element={<Esplora />} />
      </Routes>
    </BrowserRouter>
  );
}
