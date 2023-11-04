import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerts from "../component/Alerts"
import {
  app,
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from "../firebase/index";
import {
  arrayUnion,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/index";

function NewRequest() {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const userRef = doc(db, "Account", currentUser.uid);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    desiredDate: "",
    phoneNumber: "",
    category: "",
    brand: "",
    operatingSystem: "",
    description: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get a Firestore instance
    const db = getFirestore(app);
    try {
      const userRef = doc(db, "Account", currentUser.uid);
      const newRequest = {
        userid: currentUser.uid,
        name: formData.name,
        lastname: formData.lastname,
        date: Timestamp.fromDate(new Date(formData.desiredDate)),
        phone: formData.phoneNumber,
        type: formData.category,
        brand: formData.brand,
        system: formData.operatingSystem,
        description: formData.description,
        department: formData.department,
        status: "Waiting", // Set default status to "Waiting"
        approved: false,   // Set default approved status to false
      };
      await addDoc(collection(db, "request"), newRequest);
      // Update the user's requests array with the new request
      console.log("Request added to the 'request' collection in Firestore!");
      // Set showSuccessAlert to true and navigate to Request page
      navigate('/Request', { state: { showSuccessAlert: true } });
    } catch (error) {
      console.error(
        "Error adding request to the 'request' collection in Firestore: ",
        error
      );
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log(userData);
          setFormData((prevFormData) => ({
            ...prevFormData,
            name: userData.name,
            lastname: userData.lastname,
            department: userData.department,
            email: userData.email,
          }));
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [currentUser.uid]);

  

  return (
    <section className="bg-white overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full" style={{ height: '100vh' }}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow-xl sm:p-5">
          <div class="pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900">Request New Asset</h3>
          </div>
          <form onSubmit={handleSubmit} className="mb-4 px-10">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Asset Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                >
                  <option value="">Select Asset Category</option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Asset Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Asset brand"
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="operatingSystem"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Operating System
                </label>
                <input
                  type="text"
                  name="operatingSystem"
                  id="operatingSystem"
                  value={formData.operatingSystem}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Operating System"
                  required
                />
              </div>
              {/* Desired Date */}
              <div className="w-full">
                <label
                  htmlFor="desiredDate"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Desired Date
                </label>
                <input
                  type="date"
                  name="desiredDate"
                  id="desiredDate"
                  value={formData.desiredDate}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="8"
                  value={formData.description}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Your description here"
                ></textarea>
              </div>
              <FormSubheader title={"Employee Information"} />
              {/* First Name */}
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Employee First Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={formData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="First Name"
                  required
                />
              </div>
              {/* Last Name */}
              <div className="w-full">
                <label
                  htmlFor="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Employee Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Last Name"
                  required
                />
              </div>
              {/* Phone Number */}
              <div className="w-full">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Employee Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="111-222-3333"
                  required
                />
                <small className="text-gray-500">Format: 111-222-3333</small>
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Employee Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                >
                  <option value="">Select Employee Department</option>
                  <option value="HR">HR</option>
                  <option value="FIN">FIN</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link
                to={`/Request`}
                className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="bg-teal-700 hover:bg-teal-900 text-white font-bold my-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
export default NewRequest;

const FormSubheader = ({ title }) => {
  return (
    <div class="sm:col-span-2 pb-2 mb-2 rounded-t border-b sm:mb-2">
      <h3 class="text-lg font-semibold text-gray-900 ">
        {/* Order Related Information */}
        {title}
      </h3>
    </div>
  );
};