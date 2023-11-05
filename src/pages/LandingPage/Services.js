import React from "react";
import laptop from "../../images/Laptop.svg"
export default function Services() {
  return (
    <div>
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .floating-image {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
      <section class="text-gray-600 body-font">
        <div class="flex flex-col text-center w-full ">
          {/* <h2 class="text-xs text-teal-500 tracking-widest font-medium title-font ">
            Services We Offer
          </h2> */}
          <h1 class="sm:text-3xl text-xl font-bold  title-font text-blue-500">
            Empowering Your Business
            <br /> with Optimized IT Asset Management
          </h1>
        </div>
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="lg:w-1/2  lg:w-3/4w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              class="object-cover object-center floating-image h-full w-full"
              src={laptop}
            />
          </div>
          <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div class="flex flex-col bg-white p-6  border border-purple-200  shadow-lg mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Asset maintenance
                </h2> 
                <p class="leading-relaxed text-base">
                  Asset maintenance is a service that manages the maintenance of
                  IT assets, schedules maintenance activities, and improves the
                  overall reliability of the IT infrastructure.
                </p>
            
              </div>
            </div>
            <div class="flex flex-col  bg-white p-6  border border-purple-200  shadow-lg  mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Reporting and analytics
                </h2>
                <p class="leading-relaxed text-base">
                  Reporting and analytics is a service that provides insights
                  into an organization's IT asset management by generating
                  reports on asset usage, costs, performance, compliance, and
                  planning for future upgrades and replacements.
                </p>
            
              </div>
            </div>
            <div class="flex flex-colbg-white p-6  border border-purple-200  shadow-lg mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Asset tracking
                </h2>
                <p class="leading-relaxed text-base">
                  Asset tracking is a service that monitors and tracks an
                  organization's IT assets, including hardware, software, and
                  mobile devices. It keeps track of location, status, and
                  history, as well as manages maintenance schedules and warranty
                  information.
                </p>
             
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
