"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  create_message,
  fetch_or_create_project_chat,
  fetch_or_create_taskgroup_chat,
  mark_chat_messages_as_read,
} from "@/data/chat";
import { auth } from "@/auth";

export async function send_message_to_project_chat(
  projectId: string,
  content: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  if (!content.trim()) {
    return { error: "El mensaje no puede estar vacío" };
  }

  try {
    // Obtener o crear el chat del proyecto
    const chat = await fetch_or_create_project_chat(projectId);

    // Crear el mensaje
    const message = await create_message(chat.id, session.user.id, content.trim());

    revalidatePath("/dashboard");
    
    return { message, success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Error al enviar el mensaje" };
  }
}

export async function send_message_to_taskgroup_chat(
  taskGroupId: string,
  content: string
) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  if (!content.trim()) {
    return { error: "El mensaje no puede estar vacío" };
  }

  try {
    // Obtener o crear el chat del task group
    const chat = await fetch_or_create_taskgroup_chat(taskGroupId);

    // Crear el mensaje
    const message = await create_message(chat.id, session.user.id, content.trim());

    revalidatePath(`/dashboard/task-groups/${taskGroupId}`);
    
    return { message, success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { error: "Error al enviar el mensaje" };
  }
}

export async function mark_project_chat_as_read(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  try {
    const chat = await fetch_or_create_project_chat(projectId);
    const markedCount = await mark_chat_messages_as_read(chat.id, session.user.id);

    revalidatePath("/dashboard");
    
    return { success: true, markedCount };
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return { error: "Error al marcar mensajes como leídos" };
  }
}

export async function mark_taskgroup_chat_as_read(taskGroupId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  try {
    const chat = await fetch_or_create_taskgroup_chat(taskGroupId);
    const markedCount = await mark_chat_messages_as_read(chat.id, session.user.id);

    revalidatePath(`/dashboard/task-groups/${taskGroupId}`);
    
    return { success: true, markedCount };
  } catch (error) {
    console.error("Error marking messages as read:", error);
    return { error: "Error al marcar mensajes como leídos" };
  }
}

export async function get_project_chat_messages(projectId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  try {
    // Obtener o crear el chat del proyecto
    const chat = await fetch_or_create_project_chat(projectId);
    
    // Obtener mensajes usando la función de data/chat
    const { fetch_chat_messages } = await import("@/data/chat");
    const messages = await fetch_chat_messages(chat.id, session.user.id);

    return { 
      success: true, 
      chat: { id: chat.id, name: chat.name }, 
      messages: messages.reverse()
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { error: "Error al obtener mensajes" };
  }
}

export async function get_taskgroup_chat_messages(taskGroupId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Usuario no autenticado" };
  }

  try {
    // Obtener o crear el chat del task group
    const chat = await fetch_or_create_taskgroup_chat(taskGroupId);
    
    // Obtener mensajes usando la función de data/chat
    const { fetch_chat_messages } = await import("@/data/chat");
    const messages = await fetch_chat_messages(chat.id, session.user.id);

    return { 
      success: true, 
      chat: { id: chat.id, name: chat.name }, 
      messages: messages.reverse()
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { error: "Error al obtener mensajes" };
  }
}