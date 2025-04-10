"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TreeNode from "./TreeNode";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    email: "",
    nomineeName: "",
    nomineeRelation: "",
    nomineePhone: "",
    address: "",
    pinCode: "",
    bankName: "",
    branchAddress: "",
    accountNo: "",
    accountType: "",
    ifscCode: "",
    micrNo: "",
    panNo: "",
    aadhaarNo: "",
    sponsorName: "",
    sponsorId: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [tree, setTree] = useState(null);
  const [myAddedUsers, setMyAddedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const router = useRouter();

  const fetchMyAddedUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/my-children`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setMyAddedUsers(data);
    } catch (err) {
      console.error("❌ Failed to fetch added users:", err.message);
    }
  };

  const fetchTree = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/tree`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      setTree(data);
    } catch (err) {
      console.error("❌ Failed to fetch tree:", err.message);
    }
  };

  const addUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/add-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ User added successfully");
      setFormData({
        name: "",
        fatherName: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        phone: "",
        email: "",
        nomineeName: "",
        nomineeRelation: "",
        nomineePhone: "",
        address: "",
        pinCode: "",
        bankName: "",
        branchAddress: "",
        accountNo: "",
        accountType: "",
        ifscCode: "",
        micrNo: "",
        panNo: "",
        aadhaarNo: "",
        sponsorName: "",
        sponsorId: "",
        password: "",
      });

      fetchTree();
      fetchMyAddedUsers();
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTree();
    fetchMyAddedUsers();
    console.log(selectedUser, "user data");
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* KYC Form */}
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-2">KYC/Registration Form</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => {
            if (key === "gender") {
              return (
                <div key={key} className="flex flex-col">
                  <label className="mb-1 font-medium capitalize">Gender</label>
                  <div className="flex space-x-4">
                    {["Male", "Female", "Other"].map((g) => (
                      <label key={g}>
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
                          onChange={handleChange}
                        />{" "}
                        {g}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            if (key === "maritalStatus") {
              return (
                <div key={key} className="flex flex-col">
                  <label className="mb-1 font-medium capitalize">
                    Marital Status
                  </label>
                  <div className="flex space-x-4">
                    {["Married", "Single"].map((status) => (
                      <label key={status}>
                        <input
                          type="radio"
                          name="maritalStatus"
                          value={status}
                          checked={formData.maritalStatus === status}
                          onChange={handleChange}
                        />{" "}
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <input
                key={key}
                type={key === "password" ? "password" : "text"}
                name={key}
                placeholder={key.replace(/([A-Z])/g, " $1")}
                value={value}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full capitalize"
              />
            );
          })}
        </div>

        <button
          onClick={addUser}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add User
        </button>
        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔓 Logout
        </button>
      </div>

      {/* Tree Structure */}
      <div>
        <h2 className="text-xl font-semibold mb-4">🌳 User Tree Structure</h2>
        {tree ? <TreeNode node={tree} /> : <p>Loading tree...</p>}
      </div>

      {/* Users You Added */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">👥 Users You Added</h2>
        {myAddedUsers.length > 0 ? (
          <ul className="space-y-2">
            {myAddedUsers.map((user) => (
              <li
                key={user._id}
                className="border p-3 rounded bg-white shadow flex flex-col md:flex-row md:justify-between md:items-center"
              >
                <div>
                  <strong>{user.name}</strong> ({user.email})
                  <div className="text-sm text-gray-600">
                    Phone: {user.phone} | Gender: {user.gender}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="mt-2 md:mt-0 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  👁 View
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">You haven't added any users yet.</p>
        )}

        {/* View Details Section */}
        {selectedUser && (
          <div className="mt-6 p-4 border rounded shadow bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">👤 User Details</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-red-500 hover:underline"
              >
                ✖ Close
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(selectedUser).map(([key, value]) => (
                <div key={key}>
                  <strong className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </strong>{" "}
                  {value?.toString()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
