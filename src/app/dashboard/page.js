"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import KYCForm from "../components/KYCForm";
import AddedUsersList from "../components/AddedUsersList";
import UserDetailsModal from "../components/UserDetailsModal";
import TreeNode from "./TreeNode";

const Dashboard = () => {
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

  const [myAddedUsers, setMyAddedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tree, setTree] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  const fetchMyAddedUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${baseURL}/api/users/my-children`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMyAddedUsers(data.children); // assumes your API response has "children" array
    } catch (error) {
      console.error("Failed to fetch added users", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserAdd = async () => {
    try {
      const token = localStorage.getItem("token");

      // Create a shallow copy of formData to clean it
      const cleanedFormData = { ...formData };

      // Remove sponsorId if it's an empty string
      if (!cleanedFormData.sponsorId) {
        delete cleanedFormData.sponsorId;
      }

      await axios.post(`${baseURL}/api/users/add-user`, cleanedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("User added successfully!");
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
    } catch (error) {
      console.error(
        "Failed to add user:",
        error.response?.data || error.message
      );
      setMessage("Failed to add user. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  useEffect(() => {
    fetchTree();
    fetchMyAddedUsers();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
      <KYCForm
        formData={formData}
        handleChange={handleChange}
        handleUserAdd={handleUserAdd}
        message={message}
        myAddedUsers={myAddedUsers}
      />
      <div className="w-full h-[80vh] overflow-auto p-6 bg-gray-50">
        <div className="min-w-max mx-auto">
          {tree ? <TreeNode node={tree} /> : <p>Loading tree...</p>}
        </div>
      </div>

      {/* <TreeStructure tree={tree} loading={loading} message={message} /> */}
      <AddedUsersList />
      <UserDetailsModal
        selectedUser={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default Dashboard;
