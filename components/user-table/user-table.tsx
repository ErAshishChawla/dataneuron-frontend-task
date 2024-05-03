"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { useModalStore } from "@/providers/modal-store-provider";

import { type User } from "@/types";
import { ModalType } from "@/stores/modal-store";
import { Edit2 } from "lucide-react";

interface UserTableProps {
  users: User[];
}

function UserTable({ users }: UserTableProps) {
  const onOpen = useModalStore((store) => store.onOpen);
  let content: React.ReactNode;

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
      <div className="w-full flex flex-row-reverse">
        <Button
          onClick={() => {
            onOpen(ModalType.addUser);
          }}
        >
          Add User
        </Button>
      </div>
      <div className="border border-blue-500 rounded-md overflow-y-auto flex flex-col h-fit">
        <div className="border-b border-blue-500 p-4 w-full">
          <p className="font-semibold">Name</p>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto p-2">
          {content}
        </div>
      </div>
    </div>
  );
}

export default UserTable;
