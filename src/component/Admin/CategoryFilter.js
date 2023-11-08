import React from "react";

export default function CategoryFilter({
  categories,
  handleCategoryChange,
  selectedCategories,
}) {
  const [openFilter, setOpenFilter] = React.useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };
  return (
    <div className="flex items-center space-x-3 w-full md:w-auto">
      <div class="">
        <button
          onClick={handleOpenFilter}
          id="filterDropdownButton"
          data-dropdown-toggle="filterDropdown"
          class="flex   items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-gray-200"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            class="w-4 h-4 mr-2 text-gray-400"
            viewbox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
              clip-rule="evenodd"
            />
          </svg>
          Filter
          <svg
            class="-mr-1 ml-1.5 w-5 h-5"
            fill="currentColor"
            viewbox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
          </svg>
        </button>
        {openFilter && (
          <div
            id="filterDropdown"
            class="z-10  absolute mt-14 top-6 right-0 w-48 p-3 bg-white rounded-lg shadow"
          >
            <h6 class="mb-3 text-sm font-medium text-gray-900 ">Category</h6>
            <ul class="space-y-2 text-sm" aria-labelledby="dropdownDefault">
              {categories.map((category) => (
                <li class="flex items-center">
                  <label
                    class="ml-2 text-sm font-medium text-gray-900"
                    key={category}
                  >
                    <input
                      type="checkbox"
                      class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 "
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
