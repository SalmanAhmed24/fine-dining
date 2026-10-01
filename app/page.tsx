import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Triptych from "@/components/Triptych";
import Statement from "@/components/Statement";
import Room from "@/components/Room";
import Courses from "@/components/Courses";
import Reserve from "@/components/Reserve";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <Triptych />
        <Statement />
        <Room />
        <Courses />
        <Reserve />
      </main>
      <Footer />
    </>
  );
}
