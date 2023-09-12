import React from "react";

export default function Services() {
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="flex flex-col text-center w-full ">
          <h2 class="text-xs text-teal-500 tracking-widest font-medium title-font ">
            Services We Offer
          </h2>
          <h1 class="sm:text-3xl text-xl font-medium title-font text-gray-900">
            Empowering Your Business
            <br /> with Optimized IT Asset Management
          </h1>
        </div>
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            {/* <img alt="feature" class="object-cover object-center h-full w-full" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80" /> */}
            <img
              alt="feature"
              class="object-cover object-center h-full w-full"
              src="https://images.unsplash.com/photo-1604754742629-3e5728249d73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            />
          </div>
          <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
            <div class="flex flex-col bg-gray-50 p-6  border border-gray-200  mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Asset maintenance
                </h2>
                <p class="leading-relaxed text-base">
                  Asset maintenance is a service that manages the maintenance of
                  IT assets, schedules maintenance activities, and improves the
                  overall reliability of the IT infrastructure.
                </p>
                <a class="mt-3 text-teal-800 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="flex flex-col  bg-gray-50 p-6  border border-gray-200  mb-10 lg:items-start items-center">
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
                <a class="mt-3 text-teal-800 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div class="flex flex-col bg-gray-50 p-6  border border-gray-200 mb-10 lg:items-start items-center">
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
                <a class="mt-3 text-teal-800 inline-flex items-center">
                  Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
