import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects /> {/* ✅ Use actual Projects component */}

      <section
        id="contact"
        className="h-screen bg-red-100 dark:bg-red-900 flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contact</h1>
      </section>
    </>
  );
}

export default App;
