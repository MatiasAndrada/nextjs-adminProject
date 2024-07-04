"use client";

import { Button } from "@/components/ui/button";
import { setSelectedProject } from "@/actions/projects";

export function SetCurrentProjectId({
  id,
  children,
}: {
  id: string | null;
  children: React.ReactNode;
}) {
  async function handleSetCurrentProjectId(id: string | null) {
    await setSelectedProject(id);
  }
  return (
    <Button variant="ghost" onClick={() => handleSetCurrentProjectId(id)}>
      {/* <TrashIcon className="w-4 h-4 mr-1" /> */}
      {children}
    </Button>
  );
}
