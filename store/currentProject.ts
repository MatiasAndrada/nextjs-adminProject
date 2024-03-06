
import { createStore } from 'zustand/vanilla'
import { setSelectedProject } from "@/actions/select-project";
import type { Project } from "@prisma/client";


export type CurrentProjectState = {
    project: Project | null
}

export type CounterActions = {
    setProject: (project: Project) => void
    setDefaultProject: () => void
}

export type CurrentProjectStore = CurrentProjectState & CounterActions


export const defaultInitState: CurrentProjectState = {
    project: null
}

export const createCurrentProjectStore = (
    initState: CurrentProjectState = defaultInitState,
) => {
    return createStore<CurrentProjectStore>()((set) => ({
        ...initState,
        setProject: async (project: Project) => {
            await setSelectedProject(project.id);
            set({ project });
        },
        setDefaultProject: async () => {
            await setSelectedProject(null);
            set({ project: null });
        },
    }))
}



/* export const selectedProjectStore = create((set) => ({
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


 */