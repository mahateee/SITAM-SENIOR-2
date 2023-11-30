import { useState } from "react";
import StatusSpan from "../StatusSpan";
import { Link } from "react-router-dom";

export default function AssetRow({
  asset,
  columnVisibility,
  index,
  openCautionDialog,
}) {
  const { AssetID, name, Status, Brand, Category, date, id } = asset;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <tr className="border-b" data-testid="asset" key={index} >
      <td className="p-4 text-sm font-normal text-gray-700 whitespace-nowrap text-center">{index + 1}</td>
      {columnVisibility.ID && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{AssetID}</td>
      )}
      {columnVisibility.Name && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{name}</td>
      )}
      {columnVisibility.Status && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
          <StatusSpan status={Status} />
        </td>
      )}
      {columnVisibility.Brand && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{Brand}</td>
      )}
      {columnVisibility.Category && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">
          <span
            className={`bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400`}
          >
            {Category}
          </span>
        </td>
      )}
      {columnVisibility.Date && (
        <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap text-center">{date}</td>
      )}
      <td className="px-4 py-3  text-center">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex items-center text-gray-500 rounded-md hover:bg-gray-100 focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500"
            id={`options-menu-${index}`}
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-haspopup="true"
            onClick={toggleMenu}
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
          {isMenuOpen && (
            <div
              className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={`options-menu-${index}`}
            >
              <div className="py-1 " role="none">
                <ul
                  class="py-2 text-sm  text-gray-700 "
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li class="block px-4 py-2 hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className=" w-4 h-4 inline-block mr-2"
                      viewBox="0 0 22 22"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      ></path>
                    </svg>
                    <Link to={`/Asset/show/${asset.id}`}>Information</Link>
                  </li>
                  <li class="block px-4 py-2 hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className=" w-4 h-4 inline-block mr-2"
                      viewBox="0 0 22 22"
                    >
                      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                      ></path>
                    </svg>
                    <Link to={`/Asset/showhistory/${asset.id}`}>History</Link>
                  </li>
                  <li class="block px-4 py-2 hover:bg-gray-100 ">
                    <Link to={`/Asset/edit/${asset.id}`}>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        className=" w-5 h-5 inline-block mr-2"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                        <path
                          fill-rule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Edit
                    </Link>
                  </li>
                  <li
                    class="block px-4 py-2  text-red-700 hover:bg-red-100 hover:text-red-900"
                    onClick={() => {
                      openCautionDialog(asset.id); // Open the caution dialog
                    }}
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" w-5 h-5 inline-block mr-2"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
