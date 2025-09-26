import { db } from "@/lib/db";
import { ChatType } from "@prisma/client";

export async function fetch_or_create_project_chat(projectId: string) {
  // Intentar encontrar un chat existente para el proyecto
  let chat = await db.chat.findFirst({
    where: {
      projectId,
      type: "PROJECT",
    },
  });

  // Si no existe, crear uno nuevo
  if (!chat) {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { name: true },
    });

    chat = await db.chat.create({
      data: {
        name: `${project?.name || "Project"} - General Chat`,
        type: "PROJECT",
        projectId,
      },
    });
  }

  return chat;
}

export async function fetch_or_create_taskgroup_chat(taskGroupId: string) {
  // Intentar encontrar un chat existente para el task group
  let chat = await db.chat.findFirst({
    where: {
      taskGroupId,
      type: "TASK_GROUP",
    },
  });

  // Si no existe, crear uno nuevo
  if (!chat) {
    const taskGroup = await db.taskGroup.findUnique({
      where: { id: taskGroupId },
      select: { name: true, project_id: true },
    });

    chat = await db.chat.create({
      data: {
        name: `${taskGroup?.name || "TaskGroup"} - Chat`,
        type: "TASK_GROUP",
        taskGroupId,
        projectId: taskGroup?.project_id,
      },
    });
  }

  return chat;
}

export async function fetch_chat_messages(
  chatId: string,
  userId: string,
  limit: number = 50,
  offset: number = 0
) {
  const messages = await db.message.findMany({
    where: { chatId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      readBy: {
        where: { userId },
        select: { readAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  });

  return messages.map((message) => ({
    id: message.id,
    content: message.content,
    userId: message.userId,
    userName: message.user.name || "Unknown User",
    userImage: message.user.image,
    createdAt: message.createdAt,
    chatId: message.chatId,
    isRead: message.readBy.length > 0,
  }));
}

export async function fetch_unread_messages_count(chatId: string, userId: string) {
  const count = await db.message.count({
    where: {
      chatId,
      userId: { not: userId }, // No contar los propios mensajes
      readBy: {
        none: { userId }, // Mensajes que no han sido leídos por este usuario
      },
    },
  });

  return count;
}

export async function fetch_unread_messages_count_by_taskgroup(
  taskGroupId: string,
  userId: string
) {
  const chat = await db.chat.findFirst({
    where: {
      taskGroupId,
      type: "TASK_GROUP",
    },
  });

  if (!chat) return 0;

  return fetch_unread_messages_count(chat.id, userId);
}

export async function fetch_all_taskgroups_unread_counts(
  projectId: string,
  userId: string
) {
  const taskGroups = await db.taskGroup.findMany({
    where: { project_id: projectId },
    include: {
      chat: {
        include: {
          messages: {
            where: {
              userId: { not: userId }, // No contar los propios mensajes
              readBy: {
                none: { userId }, // Mensajes no leídos por este usuario
              },
            },
            select: { id: true },
          },
        },
      },
    },
  });

  const unreadCounts: Record<string, number> = {};

  taskGroups.forEach((taskGroup) => {
    unreadCounts[taskGroup.id] = taskGroup.chat?.messages.length || 0;
  });

  return unreadCounts;
}

export async function create_message(
  chatId: string,
  userId: string,
  content: string
) {
  const message = await db.message.create({
    data: {
      content,
      userId,
      chatId,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return {
    id: message.id,
    content: message.content,
    userId: message.userId,
    userName: message.user.name || "Unknown User",
    userImage: message.user.image,
    createdAt: message.createdAt,
    chatId: message.chatId,
    isRead: false,
  };
}

export async function mark_messages_as_read(
  messageIds: string[],
  userId: string
) {
  // Usar upsert para evitar duplicados
  const markPromises = messageIds.map((messageId) =>
    db.messageRead.upsert({
      where: {
        messageId_userId: {
          messageId,
          userId,
        },
      },
      update: {
        readAt: new Date(),
      },
      create: {
        messageId,
        userId,
        readAt: new Date(),
      },
    })
  );

  await Promise.all(markPromises);
}

export async function mark_chat_messages_as_read(chatId: string, userId: string) {
  // Obtener todos los mensajes no leídos del chat
  const unreadMessages = await db.message.findMany({
    where: {
      chatId,
      userId: { not: userId }, // No marcar los propios mensajes
      readBy: {
        none: { userId },
      },
    },
    select: { id: true },
  });

  const messageIds = unreadMessages.map((msg) => msg.id);

  if (messageIds.length > 0) {
    await mark_messages_as_read(messageIds, userId);
  }

  return messageIds.length;
}