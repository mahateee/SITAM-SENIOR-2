import React, { useState, useEffect } from 'react';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, Timestamp} from '../firebase/index';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Maintenance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    ID:id ||'',
    assetID: '',
    category: '',
    maintenanceType: '',
    remarks: '',
    urgency: '',
    user: '',
    predictedUrgency:'',
    approved: false,
    status: "Waiting",
    role:"",
    date: Timestamp.fromDate(new Date()),  });
  

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateAssetStatus = async (id) => {
    try {
      const assetDocRef = doc(db, 'asset', id);
      await updateDoc(assetDocRef, { Status: 'Maintenance' });
      console.log('Asset status updated successfully');
    } catch (error) {
      console.error('Error updating asset status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentDate = new Date();
      
      // Update the formData with the current date
      setFormData((prevData) => ({
        ...prevData,
        date: Timestamp.fromDate(currentDate),
      }));
  
      const maintanceRequestRef = collection(db, 'Maintainance_Requests');
      const newDocRef = await addDoc(maintanceRequestRef, formData);
      console.log('Document written with ID: ', newDocRef.id);
  
      // Reset the form data
      setFormData({
        ID:id ||'',
        assetID: '',
        category: '',
        maintenanceType: '',
        remarks: '',
        urgency: '',
        user: '',
        predictedUrgency:'',
        role:"",
        approved: false,
        status: 'Waiting',
        date: Timestamp.fromDate(new Date()), 
       
      });
  
      // Update the asset status after adding the document
      await updateAssetStatus(formData.assetID);
  
      // Set showSuccessAlert to true and navigate to the Request page
      navigate('/personalassets', { state: { showMaintenanceAlert: true } });
  
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };
  
  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const assetDocRef = doc(db, 'asset', id);
        const assetDocSnapshot = await getDoc(assetDocRef);
  
        if (assetDocSnapshot.exists()) {
          const assetData = assetDocSnapshot.data();
          const assetID = assetData.AssetID; 
          const employeeId = assetData.employeeId;
          const employeeDocRef = doc(db, 'Account', employeeId);
          const employeeDocSnapshot = await getDoc(employeeDocRef);
  
          if (employeeDocSnapshot.exists()) {
            const employeeData = employeeDocSnapshot.data();
  
            setFormData((prevData) => ({
              ...prevData,
              assetID: assetID || '', 
              category: assetData.Category || '',
              user: `${employeeData.name || ''} ${employeeData.lastname || ''}`,
              role: employeeData.role || '', // Add the role here
            }));
          } else {
            console.error('Employee not found.');
          }
        } else {
          console.error('Asset not found.');
        }
      } catch (error) {
        console.error('Error fetching asset data:', error);
      }
    };
  
    fetchAssetData();
  }, [id]);
  

  return (
    <section className="bg-gray-200 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full" style={{ height: '100vh' }}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow-xl sm:p-5">
          <div class="pb-4 mb-4 rounded-t border-b-2 sm:mb-5">
            <h3 className="text-lg font-semibold text-blue-800 ">Request Maintenance Form</h3>
          </div>
          <form onSubmit={handleSubmit} className="mb-4 px-10">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {/* Asset ID */}
              <div className="w-full">
                <label
                  htmlFor="assetID"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Asset ID
                </label>
                <input
                  type="text"
                  name="assetID"
                  id="assetID"
                  readOnly
                  onChange={handleChange}
                  value={formData.assetID}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Asset ID"
                  required
                />
              </div>
              {/* User */}
              <div className="w-full">
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Employee
                </label>
                <input
                  readOnly
                  type="text"
                  name="user"
                  id="user"
                  value={formData.user}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="User"
                  required
                />
              </div>
              {/* Role */}
<div className="w-full">
  <label
    htmlFor="role"
    className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
  >
    Role
  </label>
  <input
    readOnly
    type="text"
    name="role"
    id="role"
    value={formData.role}
    onChange={handleChange}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
    placeholder="Role"
    required
  />
</div>

              {/* Assign */}
              <div className="w-full">
                <label
                  htmlFor="assign"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Assigned Employee
                </label>
                <input
                  type="text"
                  name="assign"
                  id="assign"
                  readOnly
                  value={formData.assign}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Waiting to be Assigned"
                  required
                />
              </div>
              {/* Category */}
              <div className="w-full">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  readOnly
                  value={formData.category}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder="Category"
                  required
                />
              </div>
              {/* Maintenance Type */}
              <div className="w-full">
                <label
                  htmlFor="maintenanceType"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Maintenance Type
                </label>
                <select
                  name="maintenanceType"
                  id="maintenanceType"
                  value={formData.maintenanceType}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  required
                >
                  <option value="" disabled>Select Maintenance Type</option>
                  <option value="Repair">Repair</option>
                  <option value="Hardware issues">Hardware Issues</option>
                  <option value="Software issues">Software Issues</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              {/* Urgency */}
              <div className="w-full">
                <label
                  htmlFor="urgency"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Urgency
                </label>
                <select
                  name="urgency"
                  id="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  required
                >
                  <option value="" disabled>Select Maintenance Urgency</option>
                  <option value="within 3 Days">Within 3 Days</option>
                  <option value="within A Week">Within a Week</option>
                  <option value="within A Month">Within a Month</option>
                </select>
              </div>
              {/* Remarks */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="remarks"
                  className="block mb-2 text-sm font-medium text-gray-900 white:text-white"
                >
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  id="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
                  placeholder=" unable to install xxx software ....."
                  rows={4}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/personalassets')}
                className=" inline-flex items-center text-black  rounded-lg font-medium text-md px-14 py-2 text-center font-semibold leading-6 bg-transparent hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white focus:outline-none font-medium rounded-full text-sm px-4 py-2 text-center mr-3 border-2 border-gradient-to-r from-blue-500 to-purple-500 "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center items-center my-6 py-2 px-4 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-green-300 "
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};



export default Maintenance;

