// /ui/UiTabs.tsx
import * as Tabs from "@radix-ui/react-tabs";
import React from "react";

export const TabsRoot: React.FC<{
  defaultValue?: string;
  children: React.ReactNode;
}> = ({ defaultValue = "tab1", children }) => (
  <Tabs.Root
    className="flex flex-col bg-darkModeBg text-black dark:text-white"
    defaultValue={defaultValue}
  >
    {children}
  </Tabs.Root>
);

export const TabsList: React.FC<{
  ariaLabel: string;
  children: React.ReactNode;
}> = ({ ariaLabel, children }) => (
  <Tabs.List className="shrink-0 flex border-gray-500" aria-label={ariaLabel}>
    {children}
  </Tabs.List>
);

export const TabsTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <Tabs.Trigger
    className="px-5 h-12 flex-1 flex items-center justify-center text-lg leading-none select-none first:rounded-tl-md last:rounded-tr-md normal-case data-[state=active]:text-blue-500 bg-slate-300/50 data-[state=active]:bg-slate-400/60 dark:bg-slate-800 dark:data-[state=active]:bg-slate-900/60 data-[state=active]:border-b-2 border-slate-500 hover:bg-slate-400/50 hover:dark:bg-slate-900"
    value={value}
  >
    {children}
  </Tabs.Trigger>
);

export const TabsContent: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <Tabs.Content className="p-3 sm:p-0" value={value}>
    {children}
  </Tabs.Content>
);
