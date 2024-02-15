"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from 'next/cache'


export const setSelectedProject = async (projectId: string | null) => {
    const session = await auth();
    const id = session?.user?.id as string;

    // Verificar la existencia del usuario antes de la actualización
    const existingUser = await db.user.findUnique({
        where: {
            id
        }
    });

    if (!existingUser) {
        console.error("El usuario no se encontró antes de la actualización.");
        // Manejar el error o salir de la función
        throw new Error("Usuario no encontrado");
    }

    try {
        // Actualizar el usuario con el nuevo proyecto seleccionado
        const updatedUser = await db.user.update({
            where: {
                id
            },
            data: {
                selected_project_id: projectId
            }
        });

        revalidatePath("/dashboard"); // Revalidar/refresh la página de dashboard
        return updatedUser;
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        // Manejar el error de Prisma de manera adecuada
        throw error;
    }
}
