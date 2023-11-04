import React, { useState, useEffect } from 'react';
import { doc, getDoc, addDoc, collection, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/index';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Maintenance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    assetID: id || '',
    category: '',
    maintenanceType: '',
    remarks: '',
    urgency: '',
    user: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateAssetStatus = async (assetId) => {
    try {
      const assetDocRef = doc(db, 'asset', assetId);
      await updateDoc(assetDocRef, { Status: 'Maintenance' });
      console.log('Asset status updated successfully');
    } catch (error) {
      console.error('Error updating asset status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const maintanceRequestRef = collection(db, 'Maintainance_Requests');
      const newDocRef = await addDoc(maintanceRequestRef, formData);
      console.log('Document written with ID: ', newDocRef.id);
      await updateAssetStatus(formData.assetID);
      setFormData({
        assetID: id || '',
        category: '',
        maintenanceType: '',
        remarks: '',
        urgency: '',
        user: '',
      });
      // Set showSuccessAlert to true and navigate to Request page
      navigate('/personalassets', { state: { showMaintenanceAlert: true } });

    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const assetDocRef = doc(db, 'asset', id);
        const assetDocSnapshot = await getDoc(assetDocRef);

        if (assetDocSnapshot.exists()) {
          const assetData = assetDocSnapshot.data();
          const employeeId = assetData.employeeId;
          const employeeDocRef = doc(db, 'Account', employeeId);
          const employeeDocSnapshot = await getDoc(employeeDocRef);

          if (employeeDocSnapshot.exists()) {
            const employeeData = employeeDocSnapshot.data();


            setFormData((prevData) => ({
              ...prevData,
              category: assetData.Category || '',
              user: `${employeeData.name || ''} ${employeeData.lastname || ''}`,
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
    <section className="bg-white overflow-y-auto overflow-x-hidden flex justify-center items-center w-full md:inset-0 h-modal md:h-full" style={{ height: '100vh' }}>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow-xl sm:p-5">
          <div class="pb-4 mb-4 rounded-t border-b sm:mb-5">
            <h3 className="text-lg font-semibold text-gray-900 ">Request Maintenance</h3>
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
                  <option value="within3Days">Within 3 Days</option>
                  <option value="withinAWeek">Within a Week</option>
                  <option value="withinAMonth">Within a Month</option>
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
                className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
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
};
export default Maintenance;
