"use client";
import React from "react";
const handleDeleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you store your token
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("✅ User deleted successfully!");
      // Re-fetch users or remove deleted user from state:
      setMyAddedUsers((prev) => prev.filter((u) => u._id !== userId));
    } else {
      alert(`❌ Failed to delete: ${data.message}`);
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    alert("❌ Something went wrong while deleting.");
  }
};

const KYCForm = ({
  formData,
  handleChange,
  handleUserAdd,
  handleUserDelete,
  message,
  myAddedUsers,
}) => {
  return (
    <section className="bg-gray-100 p-6 rounded-md shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        📝 KYC/Registration Form
      </h2>

      {/* Check if the user has already added 2 children */}
      {myAddedUsers?.length >= 2 ? (
        <div className="text-center p-4 bg-green-100 border-l-4 border-green-500 rounded-md mb-6">
          <p className="text-lg font-semibold text-green-600">
            ✅ You have already added 2 users!
          </p>
          <p className="text-gray-600">
            You cannot add more users at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Loop through the form fields dynamically */}
          {Object.entries(formData).map(([key, value]) => {
            // Gender radio button group
            if (key === "gender") {
              return (
                <div key={key} className="flex flex-col space-y-2">
                  <label className="mb-1 font-medium text-gray-700">
                    Gender
                  </label>
                  <div className="flex space-x-6">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                          className="text-blue-600"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            // Marital status radio button group
            if (key === "maritalStatus") {
              return (
                <div key={key} className="flex flex-col space-y-2">
                  <label className="mb-1 font-medium text-gray-700">
                    Marital Status
                  </label>
                  <div className="flex space-x-6">
                    {["Married", "Single"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={status}
                          checked={formData.maritalStatus === status}
                          onChange={handleChange}
                          className="text-blue-600"
                        />
                        <span>{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            // Default input field
            return (
              <div key={key} className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                  value={value}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Add User Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleUserAdd}
          disabled={myAddedUsers?.length >= 2}
          className={`px-6 py-3 rounded-md text-white font-semibold ${
            myAddedUsers?.length >= 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          ➕ Add User
        </button>
      </div>

      {/* Delete User Button (Only if admin or parent is logged in) */}
      {myAddedUsers.map((user) => (
        <div key={user._id} className="bg-white p-4 shadow rounded mb-4">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={() => handleDeleteUser(user._id)}
            className="mt-2 bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
          >
            🗑️ Delete User
          </button>
        </div>
      ))}

      {/* Error message */}
      {message && (
        <p className="mt-4 text-sm text-red-600 text-center">{message}</p>
      )}
    </section>
  );
};

export default KYCForm;
