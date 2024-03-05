import { currentUser } from "./use-current-user";
import { fetchSelectedProject } from "@/data/selected-project";

export const currentProject = async () => {
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    return project_id ? await fetchSelectedProject(project_id) : null;
};

