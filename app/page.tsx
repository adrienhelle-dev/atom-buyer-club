import ClientWrapper from "@/components/ClientWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FinancialExample from "@/components/FinancialExample";
import Portfolio from "@/components/Portfolio";
import Studio3D from "@/components/Studio3D";
import PhotoCarousel from "@/components/PhotoCarousel";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import JoinClub from "@/components/JoinClub";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <ClientWrapper>
      <main>
        <Navbar />
        <Hero />
        <Services />
        <Process />
        <FinancialExample />
        <Portfolio />
        <Studio3D />
        <PhotoCarousel />
        <Testimonials />
        <FAQ />
        <JoinClub />
        <Footer />
      </main>
    </ClientWrapper>
  );
}
