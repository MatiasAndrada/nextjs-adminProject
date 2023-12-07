import TaskGridItem from './task-grid-item';
import { taskGroupItem } from '@/app/lib/definitions/task';
import { fetch_filtered_task_group } from '@/app/lib/data/tasks';

export default function TaskGrid({ Task }: { Task: taskGroupItem[] }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Task.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
