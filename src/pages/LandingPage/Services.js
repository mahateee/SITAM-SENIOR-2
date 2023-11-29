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
            <div class="flex flex-col bg-white p-6 border border-purple-200 shadow-lg mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  IT Asset Maintenance
                </h2>
                <p class="leading-relaxed text-base">
                  Our IT Asset Maintenance service oversees the care and upkeep of IT assets,
                  including scheduling maintenance activities, contributing to enhanced
                  reliability, and optimizing the overall performance of the IT infrastructure.
                </p>
              </div>
            </div>

            <div class="flex flex-col bg-white p-6 border border-purple-200 shadow-lg mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Unlock Insights with Our Asset Dashboard
                </h2>
                <p class="leading-relaxed text-base">
                  Discover the power of our Asset Lifecycle Dashboard!
                  Gain valuable insights into your IT assets – from usage and costs to performance and compliance.
                  Plan for future upgrades and replacements with ease.
                  Our user-friendly interface lets you create detailed reports and even print them for quick reference.
                  Take control of your asset management journey today!
                </p>
              </div>
            </div>

            <div class="flex flex-col bg-white p-6 border border-purple-200 shadow-lg mb-10 lg:items-start items-center">
              <div class="flex-grow">
                <h2 class="text-gray-900 text-lg title-font font-medium mb-3">
                  Comprehensive Asset History Tracking
                </h2>
                <p class="leading-relaxed text-base">
                  Our Asset Tracking service goes beyond monitoring;
                  it meticulously tracks the complete history of your organization's IT assets, encompassing hardware, software, and mobile devices.
                  Gain insights into asset location, status changes, and a detailed history log.
                  Additionally, efficiently manage maintenance schedules and warranty information to ensure optimal asset performance.
                  Experience a new level of control with our robust Asset History Tracking service.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
