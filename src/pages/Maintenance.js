import React, { useState, useEffect } from 'react';
import { doc, getDoc, addDoc, collection , updateDoc} from 'firebase/firestore';
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

      navigate('/Request');

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
    <section className="bg-white white:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 white:text-white">
          Maintenance Form
        </h2>
        <form onSubmit={handleSubmit}>
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
                User
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
                Assign
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
  <option value="Hardware issues">Hardware issues</option>
  <option value="Software issues">Software issues</option>
  <option value="other">other</option>
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
  <option value="" disabled>Select Urgency</option>
  <option value="within3Days">Within 3 Days</option>
  <option value="withinAWeek">Within a Week</option>
  <option value="withinAMonth">Within a Month</option>
</select>

            </div>
            {/* Remarks */}
       
            <div className="w-full">
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
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-primary-500 white:focus:border-primary-500"
    placeholder=" unable to install xxx software ....."
    rows={4} 
    required
  />
</div>

          </div>
          <div className="text-right mt-4">
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 white:focus:ring-blue-700 hover:bg-blue-800"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => navigate('/Request')}
              className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Maintenance;
