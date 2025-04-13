// src/app/components/ParentComponent.js

import React, { useState } from "react";
import AddedUsersList from "./AddedUsersList"; // Import the AddedUsersList component

const ParentComponent = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user

  return (
    <div>
      {/* Pass the setSelectedUser function as a prop to AddedUsersList */}
      <AddedUsersList setSelectedUser={setSelectedUser} />

      {/* Display details of the selected user */}
      {selectedUser && (
        <div>
          <h3>Selected User ID: {selectedUser}</h3>
          {/* You can fetch and display more details of the selected user here */}
        </div>
      )}
    </div>
  );
};

export default ParentComponent;
