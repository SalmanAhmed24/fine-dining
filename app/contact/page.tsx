import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import ContactInfo from "@/components/ContactInfo";
import Reserve from "@/components/Reserve";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Verdigris, see our opening hours, book a table or ask about private dining.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <PageHero
          kicker="Contact"
          lines={["Find your", "table"]}
          intro="Book online below, call us after 2 pm, or email about private dining for up to 16 guests."
          image={{ src: "/images/contact-hero.jpg", alt: "Red wine, a folded napkin and cutlery laid on a dining table" }}
        >
          <Magnetic href="#reserve" variant="solid">
            Book a table
          </Magnetic>
        </PageHero>
        <ContactInfo />
        <Reserve />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
