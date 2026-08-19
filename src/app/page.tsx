import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import NetworkDivider from "@/components/NetworkDivider";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NetworkDivider />
        <About />
        <NetworkDivider />
        <Projects />
        <NetworkDivider />
        <Experience />
        <NetworkDivider />
        <Education />
        <NetworkDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
