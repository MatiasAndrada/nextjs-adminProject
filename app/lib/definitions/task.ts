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

export enum Status {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export type TaskGroup = {
    task_group_id: string;
    project_id: string;
    author_id: string;
    name: string;
    description: string;
    criticality: Criticality;
    status: Status;
    progress: number;
    created_at: string,
    updated_at: string,
    ends_at: string,
};

export type TaskTable = {
    id: string;
    task: string;
    author: string;
    status: string;
    progress: number;
    time_left: string,
    update_ago: string,
};

export type Task = {
    task_id: string;
    task_group_id: string;
    author_id: string;
    name: string;
    description: string;
    status: string;
    progress: number;
    created_at: string,
    updated_at: string,
    ends_at: string,
};

export type SearchFields = {
    task_id?: string;
    task_group_id?: string;
    user_id?: string;
    author_id?: string;
    name?: string;
    description?: string;
    status?: string;
    progress?: string;
    createdAt?: string;
    updatedAt?: string;
    endsAt?: string;
};

export type SelectedColumns = {
    task_id: boolean;
    task_group_id: boolean;
    user_id: boolean;
    author_id: boolean;
    name: boolean;
    description: boolean;
    status: boolean;
    progress: boolean;
    created_at: boolean;
    ends_at: boolean;
    updated_at: boolean;
};
