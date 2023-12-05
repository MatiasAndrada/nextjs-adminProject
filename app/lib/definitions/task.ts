// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type taskTable = {
    id: string;
    task: string;
    owner: string;
    status: string;
    progress: number;
    time_left: string,
    update_ago: string,
};

export type taskGroupItem = {
    id: string;
    name: string;
    description: string;
    /* owner: string; */
    status: string;
    progress: number;
    created_at: string,
    updated_at: string,
    ends_at: string,
};
