import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

export default function Launcher(ps: {}) {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}
