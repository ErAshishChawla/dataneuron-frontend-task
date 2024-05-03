"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { useModalStore } from "@/providers/modal-store-provider";

import { type User } from "@/types";
import { ModalType } from "@/stores/modal-store";
import { Edit2 } from "lucide-react";
import { useApiCountStore } from "@/providers/api-count-store-provider";

interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  // Get the onOpen function from the modal store
  const onOpen = useModalStore((store) => store.onOpen);
  // Get the api count from the api count store
  const count = useApiCountStore((store) => store.count);

  let content: React.ReactNode;

  // Check if there are no users
  if (users.length === 0 || !users) {
    content = <span className="font-semibold">No users</span>;
  } else {
    content = users.map((user) => {
      return (
        <div className="flex gap-4 items-center justify-between" key={user._id}>
          <p className="text-sm overflow-hidden capitalize">{user.name}</p>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
              // Open the edit user modal with the user data
              onOpen(ModalType.editUser, {
                user: user,
              });
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
        </div>
      );
    });
  }

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="w-full flex justify-end gap-4 items-center">
        {/* Display the api count and add user button */}
        <p className="text-sm">Api Calls: {count}</p>
        <Button
          onClick={() => {
            onOpen(ModalType.addUser);
          }}
        >
          Add User
        </Button>
      </div>
      <div className="border border-blue-500 rounded-md flex flex-col">
        <div className="border-b border-blue-500 p-4 w-full">
          <p className="font-semibold">Name</p>
        </div>
        <div className="flex-1 flex flex-col p-2">{content}</div>
      </div>
    </div>
  );
}

export default UserTable;
