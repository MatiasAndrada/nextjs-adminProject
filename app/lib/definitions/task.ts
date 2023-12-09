// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.


export enum Criticality {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical',
}

export type TaskGroup = {
    task_group_id: string;
    user_id: string;
    owner_id: string;
    name: string;
    description: string;
    criticality: Criticality;
    status: string;
    progress: number;
    created_at: string,
    updated_at: string,
    ends_at: string,
};

export type TaskTable = {
    id: string;
    task: string;
    owner: string;
    status: string;
    progress: number;
    time_left: string,
    update_ago: string,
};

export type Task = {
    task_id: string;
    task_group_id: string;
    user_id: string;
    owner_id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    created_at: string,
    updated_at: string,
    ends_at: string,
};

export type SearchFields = {
    taskId?: string;
    taskGroupId?: string;
    userId?: string;
    ownerId?: string;
    name?: string;
    description?: string;
    status?: string;
    progress?: string;
    createdAt?: string;
    endsAt?: string;
    updatedAt?: string;
};

export type SelectedColumns = {
    taskId: boolean;
    taskGroupId: boolean;
    userId: boolean;
    ownerId: boolean;
    name: boolean;
    description: boolean;
    status: boolean;
    progress: boolean;
    createdAt: boolean;
    endsAt: boolean;
    updatedAt: boolean;
};
