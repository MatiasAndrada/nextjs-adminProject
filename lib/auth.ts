import { auth } from "@/auth";
import { fetchSelectedProject } from "@/data/selected-project";

export const currentUser = async () => {
    const session = await auth();
    return session?.user;
};

export const currentSelectedProject = async () => {
    const user = await currentUser();
    const project_id = user?.selected_project_id;
    if (!project_id) return "Not Found";
    return await fetchSelectedProject(project_id);
};

