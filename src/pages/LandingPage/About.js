import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import AboutPic from '../../images/about.png';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setAnimationKey((prevKey) => prevKey + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }

          .animate-fadeIn-${animationKey} {
            animation: fadeIn 2s ease-in;
          }
        `}
      </style>

      <section className="text-gray-700 mb-40 mt-16">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div
            className={`lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center animate-fadeIn-${animationKey}`}
          >
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-blue-500">
              Elevate your IT with our Asset Management System Control everything from one platform.
              {/* <br className="hidden lg:inline-block" /> */}
            </h1>
            <p className="mb-8 text-gray-500 leading-relaxed">
              At our IT asset management system, we believe in simplifying the management of your IT assets. Our system is designed to provide you with a user-friendly and comprehensive solution that enables you to track your assets, monitor performance, and identify potential issues. With our system, you can streamline your IT asset management process and optimize your IT infrastructure to improve your overall productivity.
            </p>
          </div>
          <div className={`lg:max-w-lg lg:w-full md:w-1/2 w-5/6 animate-fadeIn-${animationKey}`}>
            <Link to="fadeContainer" smooth={true} duration={500}>
              <img className="object-cover object-center rounded" alt="About Picture" src={AboutPic} />
            </Link>
          </div>
        </div>
      </section>

      {/* Container for fading effect */}
      <div id="fadeContainer">
        {/* Your remaining content */}
      </div>
    </>
  );
};

export default About;
