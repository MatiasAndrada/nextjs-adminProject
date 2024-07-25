"use client";
import React, { useState } from "react";
import TabContentMessages from "./tabs-content/TabContentMessages";
import TabContentHistory from "./tabs-content/TabContentHistory";
import TabContentInfo from "./tabs-content/TabContentInfo";

import type { Status } from "@prisma/client";

interface Tab {
  index: number;
  label: string;
}
interface TabContent {
  index: number;
  component: React.ReactNode;
}

const Tab: React.FC<{
  tab: Tab;
  isActive: boolean;
  onClick: (index: number) => void;
}> = ({ tab, isActive, onClick }) => (
  <button
    type="button"
    className={`hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-slate-300 text-sm font-medium text-center border rounded-t-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-800 dark:border-slate-700  dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600 ${
      isActive ? "hs-tab-active text-primary" : ""
    }`}
    id={`hs-tab-to-select-item-${tab.index}`}
    data-hs-tab={`#hs-tab-to-select-${tab.index}`}
    aria-controls={`hs-tab-to-select-${tab.index}`}
    role="tab"
    onClick={() => onClick(tab.index)}
  >
    {tab.label}
  </button>
);

interface Props {
  id: string;
  status: Status;
  progress: number;
  createdAt: Date;
}

const TabsContent = ({ id, status, progress, createdAt }: Props) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const tabs: Tab[] = [
    { index: 1, label: "Info" },
    { index: 2, label: "Messages" },
    { index: 3, label: "History" },
  ];

  const tabContents: TabContent[] = [
    {
      index: 1,
      component: (
        <TabContentInfo
          id={id}
          status={status}
          progress={progress}
          createdAt={createdAt}
        />
      ),
    },
    { index: 2, component: <TabContentMessages /> },
    { index: 3, component: <TabContentHistory /> },
  ];

  return (
    <>
      <select
        id="tab-select"
        className="sm:hidden  px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 "
        aria-label="Tabs"
        role="tablist"
        value={`#hs-tab-to-select-${activeTab}`}
        onChange={(e) =>
          handleTabClick(Number(e.target.value.split("-").pop()))
        }
      >
        {tabs.map(({ index, label }) => (
          <option key={index} value={`#hs-tab-to-select-${index}`}>
            {label}
          </option>
        ))}
      </select>

      <div className="hidden sm:block ">
        <nav
          className="flex space-x-2"
          aria-label="Tabs"
          role="tablist"
          hs-data-tab-select="#tab-select"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.index}
              tab={tab}
              isActive={activeTab === tab.index}
              onClick={handleTabClick}
            />
          ))}
        </nav>
      </div>

      <div className="p-2  0 rounded-lg min-h-20">
        {tabContents.map(({ index, component }) => (
          <div
            key={index}
            id={`hs-tab-to-select-${index}`}
            role="tabpanel"
            aria-labelledby={`hs-tab-to-select-item-${index}`}
            className={` p-3 sm:p-0 ${activeTab === index ? "" : "hidden"}`}
          >
            {component}
          </div>
        ))}
      </div>
    </>
  );
};

export default TabsContent;
