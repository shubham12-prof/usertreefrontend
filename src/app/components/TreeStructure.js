"use client";
import React from "react";
import TreeNode from "../components/Tree";

const TreeStructure = ({ tree, loading, message }) => (
  <section>
    <h2 className="text-xl font-semibold mb-4">🌳 User Tree Structure</h2>
    {loading ? (
      <p>Loading tree...</p>
    ) : message ? (
      <p>{message}</p>
    ) : tree ? (
      <TreeNode node={tree} />
    ) : (
      <p>No tree data available.</p>
    )}
  </section>
);

export default TreeStructure;
