import { create } from "zustand";
import { setSelectedProject } from "@/actions/select-project";
import type { Project } from "@prisma/client";

export const selectedProjectStore = create((set) => ({
    project: null as Project | null,
    setProject: async (project: Project) => {
        await setSelectedProject(project.id);
        set({ project });
    },
    setDefaultProject: async () => {
        await setSelectedProject(null);
        set({ project: null });
    },

}));


