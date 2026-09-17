import { LanguageProvider } from './hooks/useLanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { Doctors } from './components/sections/Doctors';
import { PatientCategories } from './components/sections/PatientCategories';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { ConsultationProcess } from './components/sections/ConsultationProcess';
import { Testimonials } from './components/sections/Testimonials';
import { FAQSection } from './components/sections/FAQ';
import { Location } from './components/sections/Location';
import { Appointment } from './components/sections/Appointment';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main>
          <Hero />
          <PatientCategories />
          <Services />
          <Doctors />
          <WhyChooseUs />
          <ConsultationProcess />
          <Testimonials />
          <FAQSection />
          <Location />
          <Appointment />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}

export default App;