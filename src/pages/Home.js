import Header from "./LandingPage/Header";
import Welcome from "./LandingPage/Hero";
import frame from "../images/Frame.svg"
import Footer from "./LandingPage/Footer";
import Services from "./LandingPage/Services";
import About from "./LandingPage/About";
import Info from "./LandingPage/Info";
function Home() {
  return (
    <div className="flex flex-col min-h-screenover " style={{ backgroundImage: `url(${frame})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow flow-hidden">
        <Welcome />
        <About />
        <Info />

        <Services />
        {/*  Page sections */}
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default Home;
