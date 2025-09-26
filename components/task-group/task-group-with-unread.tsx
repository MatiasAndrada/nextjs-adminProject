"use client";

import { useState, useEffect } from "react";
import { UnreadBadge } from "@/components/chat/unread-badge";
import { fetch_unread_messages_count_by_taskgroup } from "@/data/chat";
import TaskGridItem from "./task-group-grid-item";
import { Criticality, Status } from "@prisma/client";

interface TaskGroupWithUnreadProps {
  task: {
    id: string;
    name: string;
    description: string | null;
    criticality: Criticality;
    status: Status;
    updatedAt: Date | null;
    startAt: Date | null;
    endAt: Date | null;
    membersAssigned: { user: { image: string | null; name: string | null } }[];
  };
  userId: string;
}

export function TaskGroupWithUnread({ task, userId }: TaskGroupWithUnreadProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const count = await fetch_unread_messages_count_by_taskgroup(task.id, userId);
        setUnreadCount(count);
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();
  }, [task.id, userId]);

  return (
    <div className="relative">
      <TaskGridItem task={task} />
      <UnreadBadge count={unreadCount} />
    </div>
  );
}