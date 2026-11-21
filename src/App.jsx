import { lazy, Suspense } from "react";
import { ContentProvider } from "./context/ContentContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import InfoBar from "./components/sections/InfoBar";
import Features from "./components/sections/Features";
import Training from "./components/sections/Training";
import Programs from "./components/sections/Programs";
import Steps from "./components/sections/Steps";
import Stats from "./components/sections/Stats";
import OpeningHours from "./components/sections/OpeningHours";
import Coaches from "./components/sections/Coaches";
import Gallery from "./components/sections/Gallery";
import ContactSection from "./components/sections/ContactSection";
import MapBlock from "./components/sections/MapBlock";
import Sponsors from "./components/sections/Sponsors";

const AdminPage = lazy(() => import("./pages/AdminPage"));

export default function App() {
  // /admin shows the admin dashboard; everything else is the public website
  if (window.location.pathname.replace(/\/+$/, "") === "/admin") {
    return (
      <Suspense fallback={null}>
        <AdminPage />
      </Suspense>
    );
  }
  return (
    <ContentProvider>
      <Header />
      <Hero />
      <InfoBar />
      <Features />
      <Training />
      <Programs />
      <Steps />
      <Stats />
      <OpeningHours />
      <Coaches />
      <Gallery />
      <ContactSection />
      <MapBlock />
      <Sponsors />
      <Footer />
    </ContentProvider>
  );
}
