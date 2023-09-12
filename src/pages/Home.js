import Header from "../component/Header";
import Welcome from "../component/Welcome";

import Footer from "../component/Footer";
import Services from "../component/Services";
import About from "../component/About";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <Welcome />
        <About />

        <Services />
        {/*  Page sections */}
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;
