"use client";

export default function TreeNode({ node }) {
  return (
    <div className="text-center">
      <div className="bg-white p-2 border rounded shadow-md inline-block mb-2">
        <p className="font-bold">{node.name}</p>
        <p className="text-xs text-gray-500">{node.email}</p>
      </div>

      {node.children?.length > 0 && (
        <div className="flex justify-center gap-4 mt-2">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
