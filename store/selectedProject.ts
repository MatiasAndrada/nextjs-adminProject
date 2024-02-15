import { create } from "zustand";
import { setSelectedProject } from "@/actions/select-project";
import type { Project } from "@prisma/client";

export const selectedProjectStore = create((set) => ({
    project: null as Project | null,
    setProject: async (project: Project) => {
        console.log("set")
        await setSelectedProject(project.id);
        set({ project });
    },
    setDefaultProject: async () => {
        await setSelectedProject(null);
        set({ project: null });
    }

    /*     fetchSelectedProject: async () => {
            const res = await fetch("/api/selected-project");
            const project = await res.json();
            set({ project: project })
        }, */
}));
