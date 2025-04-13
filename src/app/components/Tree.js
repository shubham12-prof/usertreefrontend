"use client";

import { useEffect, useState } from "react";
import TreeNode from "@/components/TreeNode"; // Adjust the path if needed

export default function TreePage() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await fetch(
          "https://usertreebackend.onrender.com/api/users/my-tree",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you store JWT in localStorage
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tree");
        }

        const data = await res.json();
        setTreeData(data);
      } catch (err) {
        console.error("Error fetching tree:", err.message);
      }
    };

    fetchTree();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4">Your User Tree</h1>
      {treeData ? (
        <TreeNode node={treeData} />
      ) : (
        <p className="text-gray-500 text-center">Loading tree...</p>
      )}
    </div>
  );
}
