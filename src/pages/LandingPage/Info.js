import React, { useEffect } from 'react';
import scanPic from '../../images/scan.png';
import MaintenacePic from '../../images/Maintenance.png';
import chatbotPic from '../../images/chatbot.png';
import { Link as ScrollLink, Element } from 'react-scroll';

function Info() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Element name="features">
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-4xl font-bold title-font text-purple-600">
              Explore the Distinctive Features of Our System
            </h1>
          </div>
          <div className="flex flex-wrap m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-white border border-purple-200 p-8 flex-col shadow-lg fade-in opacity-0 transform -translate-y-4 transition-all duration-500 ease-in-out">
                <div className="flex items-center mb-3">
                  <h2 className="text-gray-900 text-lg title-font font-bold">Effortless Asset Insight through Scanning</h2>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="leading-relaxed text-gray-500 text-base">
                    Experience simplicity with our IT asset management system.
                    Utilize the scanning feature for instant access to asset information,
                    enhancing real-time visibility and resource management.
                  </p>
                </div>

                <img className="mx-auto mt-4" src={scanPic} alt="Scan" style={{ width: '55%' }} />
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-white border border-purple-200 p-8 flex-col shadow-lg fade-in opacity-0 transform -translate-y-4 transition-all duration-500 ease-in-out delay-150">
                <div className="flex items-center mb-3">
                  <h2 className="text-gray-900 text-lg titleFont font-bold">Comprehensive Solutions</h2>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="leading-relaxed text-gray-500 text-base">
                    We provide a complete suite of IT asset management solutions, encompassing asset discovery, inventory management, real-time tracking, and monitoring. Our goal is to optimize and secure your IT infrastructure comprehensively.
                  </p>
                </div>

                <img className="mx-auto mt-4" src={MaintenacePic} alt="Maintenance" style={{ width: '35%' }} />
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-white border border-purple-200 p-8 flex-col shadow-lg fade-in opacity-0 transform -translate-y-4 transition-all duration-500 ease-in-out delay-300">
                <div className="flex items-center mb-3">
                  <h2 className="text-gray-900 text-lg title-font font-bold">Maximize Productivity with Virtual Assistant</h2>
                </div>
                <div className="flex-grow flex items-center justify-center">
                  <p className="leading-relaxed text-gray-500 text-base">
                    Utilize our Virtual Assistant to streamline asset management and optimize IT infrastructure, redirecting your focus for enhanced productivity in essential tasks and projects.
                  </p>
                </div>


                <img className="mx-auto mt-4" src={chatbotPic} alt="Chatbot" style={{ width: '50%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
}

export default Info;
