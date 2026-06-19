import { Nav, Footer } from "../components/ui";
import CurtainReveal from "../components/CurtainReveal";

export default function Home() {
  return (
    <div className="bg-bianco text-blu-scuro font-sans">
      <Nav />
      <CurtainReveal />
      <Footer />
    </div>
  );
}
