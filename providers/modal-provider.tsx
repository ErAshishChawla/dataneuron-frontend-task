"use client";

import React, { useEffect, useState } from "react";

import AddUserModal from "@/components/modals/add-user-modal";
import EditUserModal from "@/components/modals/edit-user-modal";

function ModalProvider() {
  // Check if the component is mounted
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true when component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return null if the component is not mounted
  if (!isMounted) {
    return;
  }

  return (
    <>
      <AddUserModal />
      <EditUserModal />
    </>
  );
}

export default ModalProvider;
