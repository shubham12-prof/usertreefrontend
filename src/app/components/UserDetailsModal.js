// src/app/components/UserDetailsModal.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetailsModal = ({ selectedUserId, onClose }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedUserId) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/users/${selectedUserId}`)
        .then((response) => {
          setUserDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user by ID:", error);
          setLoading(false);
        });
    }
  }, [selectedUserId]);

  if (!selectedUserId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        {loading ? (
          <p>Loading...</p>
        ) : userDetails ? (
          <>
            <p>
              <strong>Name:</strong> {userDetails.name}
            </p>
            <p>
              <strong>Email:</strong> {userDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {userDetails.phone}
            </p>
            <p>
              <strong>Address:</strong> {userDetails.address}
            </p>
            {/* Add more fields if needed */}
          </>
        ) : (
          <p className="text-red-500">Failed to load user details.</p>
        )}

        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
