// app/dashboard/page.js
"use client";

import React from "react";
import Tree from "../components/Tree";

const dummyData = {
  _id: "1",
  name: "Admin",
  children: [
    {
      _id: "2",
      name: "User A",
      children: [
        {
          _id: "3",
          name: "User A1",
          children: [],
        },
        {
          _id: "4",
          name: "User A2",
          children: [],
        },
      ],
    },
    {
      _id: "5",
      name: "User B",
      children: [],
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Tree</h1>
      <Tree user={dummyData} />
    </div>
  );
}
