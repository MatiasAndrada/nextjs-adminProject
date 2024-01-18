import type { Task } from './task';
export enum Criticality {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
    Critical = 'Critical',
}

export type TaskGroup = {
    id: string;
    project_id: string;
    task: Task[];
    name: string;
    description?: string;
    status: string;
    progress: string;
    criticality: Criticality;
    createdAt: Date;
    updatedAt: Date;
    endsAt: Date;
};
