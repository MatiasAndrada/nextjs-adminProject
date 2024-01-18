import { createContext, useContext } from "react";
import { createStore, useStore as useZustandStore } from "zustand";
import { combine } from "zustand/middleware";
import { setSelectedProject } from "@/actions/select-project";
import { Project } from "@prisma/client";
import { currentSelectedProject } from "./auth";

export type StoreType = ReturnType<typeof initializeStore>;
type StoreInteface = ReturnType<StoreType["getState"]>;


const getDefaultInitialState = async () => {
    const selectedProject = await currentSelectedProject();
    return {
        selectedProject,
    };
}

const zustandContext = createContext<StoreType | null>(null);
export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInteface) => T) => {
    const store = useContext(zustandContext);
    if (!store) throw new Error("Store is missing the provider");
    return useZustandStore(store, selector);
};

export const initializeStore = (preloadedState = {}) => {
    return createStore(
        combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
            setSelectedProject: ({ project }: { project: Project }) => {
                setSelectedProject(project.id);
                /* setSelectedProject(projectId); // This is the action that updates the database */
            },
            getSelectedProject: () => get(),
        }))
    );
};