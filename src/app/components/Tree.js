// components/Tree.js
"use client";
import React from "react";

export default function Tree({ user }) {
  return (
    <div className="ml-4 border-l-2 border-gray-400 pl-4">
      <p className="font-semibold">{user.name}</p>
      {user.children &&
        user.children.map((child) => <Tree key={child._id} user={child} />)}
    </div>
  );
}
