"use client";

import React, { useEffect, useState } from "react";

import AddUserModal from "@/components/modals/add-user-modal";
import EditUserModal from "@/components/modals/edit-user-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
