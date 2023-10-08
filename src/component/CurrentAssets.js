import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs ,doc ,getDoc } from 'firebase/firestore';
import { db } from '../firebase/index';
import { useAuth } from '../context/AuthContext'; // Update the path as needed
import 'firebase/functions';

const AssetsTable = () => {
  const [assets, setAssets] = useState([]);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        if (!currentUser || !currentUser.uid) {
          console.error('Current user or user ID is undefined.');
          return;
        }

        console.log('Fetching assets for user ID:', currentUser.uid);

        // Fetch assets
        const assetsQuery = query(
          collection(db, 'asset'),
          where('employeeId', '==', currentUser.uid)
        );

        const assetsSnapshot = await getDocs(assetsQuery);
        const assetsData = assetsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log('Fetched assets:', assetsData);

        // Fetch employer name from the Account table
        const accountDocRef = doc(db, 'Account', currentUser.uid);
        const accountDocSnapshot = await getDoc(accountDocRef);
        const employerName = accountDocSnapshot.exists()
          ? accountDocSnapshot.data().employerName
          : 'Unknown Employer';

        console.log('Employer Name:', employerName);

        setAssets(assetsData.map((asset) => ({ ...asset, employerName })));
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [currentUser]);

return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-col items-center justify-center py-8">
      <table className="text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Current Asset
              </th>
              <th scope="col" className="px-6 py-3">
                Operating system
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {asset.name}
                </td>
                <td className="px-6 py-4">{asset.os}</td>
                <td className="px-6 py-4">
                  <button   className="bg-white-500 hover:bg-gray-50 text-gray-700 font-bold py-1 px-2 mr-2 border border-gray-500 rounded">
                    Request Return
                  </button>
                  <button className="bg-white-500 hover:bg-gray-50 text-gray-700 font-bold py-1 px-2 border border-gray-500 rounded">
                    Request Maintenance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetsTable;
