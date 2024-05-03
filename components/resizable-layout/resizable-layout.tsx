"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { User } from "@/types";
import UserTable from "../user-table/user-table";

interface ResizableLayoutProps {
  users: User[];
}

function ResizableLayout() {
  return (
    <div className="flex-1 flex flex-col p-2">
      <ResizablePanelGroup
        direction="vertical"
        className="rounded-lg border border-black flex-1"
      >
        <ResizablePanel defaultSize={50} minSize={20}>
          <ResizablePanelGroup direction="horizontal" className="flex-1 ">
            <ResizablePanel defaultSize={25} minSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Component 1</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75} minSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Component 2</span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="flex h-full p-6 flex-col">
            <UserTable data={[]} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ResizableLayout;
