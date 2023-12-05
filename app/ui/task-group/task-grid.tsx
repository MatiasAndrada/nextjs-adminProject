import TaskGridItem from './task-grid-item';
export default function TaskGrid({ tasks }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tasks.map((task, index) => (
                <TaskGridItem key={index} task={task} />
            ))}
        </div>
    );
}
