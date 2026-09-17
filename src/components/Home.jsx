import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Counters from './Counters';
import Projects from './Projects';
import MaterialInfo from './MaterialInfo';
import ContactForm from './ContactForm';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Counters />
      <Projects />
      <MaterialInfo />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Home;
