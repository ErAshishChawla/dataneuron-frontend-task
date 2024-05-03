"use client";

import React from "react";

import { Button } from "@/components/ui/button";

import { type User } from "@/types";

interface UserTableProps {
  data: User[];
}

function UserTable({ data }: UserTableProps) {
  let content: React.ReactNode;

  if (data.length === 0) {
    content = <span className="font-semibold">No users</span>;
  }

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="w-full flex flex-row-reverse">
        <Button>Add User</Button>
      </div>
      <div className="border border-blue-500 rounded-md overflow-y-auto flex flex-col items-center h-fit">
        <div className="border-b border-blue-500 p-4 w-full">
          <p className="font-semibold text-center">Name</p>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto p-2">
          {content}
        </div>
      </div>
    </div>
  );
}

export default UserTable;
