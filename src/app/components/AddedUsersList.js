"use client";

import React, { useState, useEffect } from "react";

const AddedUsersList = () => {
  const [myAddedUsers, setMyAddedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAddedUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://usertreebackend.onrender.com/api/users/my-children",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch added users");
      }

      const data = await response.json();
      console.log("✅ Fetched children:", data);

      // Check if there's a 'children' field and set the data properly
      setMyAddedUsers(data.children || []); // Use data.children if it exists
    } catch (err) {
      console.error("❌ Error fetching added users:", err);
      setError(err.message || "Failed to fetch added users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddedUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Users You Added:</h2>
      <button
        onClick={fetchAddedUsers}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh
      </button>
      <ul className="space-y-2">
        {myAddedUsers.length > 0 ? (
          myAddedUsers.map((user) => (
            <div key={user._id} className="p-2 border rounded bg-gray-50">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          ))
        ) : (
          <p>No users added.</p>
        )}
      </ul>
    </div>
  );
};

export default AddedUsersList;
