export async function getUserTree(token) {
  const res = await fetch("http://localhost:5000/api/users/tree", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user tree");
  }

  return res.json();
}
