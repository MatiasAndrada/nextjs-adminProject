import React from "react";
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import TabContentMessages from "./tabs-content/TabContentMessages";
import TabContentHistory from "./tabs-content/TabContentHistory";
import TabContentInfo from "./tabs-content/TabContentInfo";
import type { Status } from "@prisma/client";

interface Props {
  id: string;
  status: Status;
  progress: number;
  createdAt: Date;
}

const TabsContentComponent = ({ id, status, progress, createdAt }: Props) => {
  return (
    <TabsRoot defaultValue="tab1">
      <TabsList ariaLabel="Tabs">
        <TabsTrigger value="tab1">Info</TabsTrigger>
        <TabsTrigger value="tab2">Messages</TabsTrigger>
        <TabsTrigger value="tab3">History</TabsTrigger>
      </TabsList>

      <TabsContent value="tab1">
        <TabContentInfo
          id={id}
          status={status}
          progress={progress}
          createdAt={createdAt}
        />
      </TabsContent>
      <TabsContent value="tab2">
        <TabContentMessages />
      </TabsContent>
      <TabsContent value="tab3">
        <TabContentHistory />
      </TabsContent>
    </TabsRoot>
  );
};

export default TabsContentComponent;
