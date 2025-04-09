"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TreeNode from "./TreeNode";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [tree, setTree] = useState(null);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchTree = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/tree`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTree(data);
    } catch (err) {
      console.error("Failed to fetch tree:", err.message);
    }
  };

  const addUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ User added successfully");
      setFormData({ name: "", email: "", password: "" });
      fetchTree(); // refresh the tree
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>

      {/* Add User Form */}
      <div className="bg-gray-100 p-4 rounded-md shadow">
        <h2 className="text-xl font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add User
        </button>
        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔓 Logout
        </button>
      </div>

      {/* Tree View */}
      <div>
        <h2 className="text-xl font-semibold mb-4">User Tree Structure</h2>
        {tree ? <TreeNode node={tree} /> : <p>Loading tree...</p>}
      </div>
    </div>
  );
}
