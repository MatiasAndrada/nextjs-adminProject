import { NextResponse, NextRequest } from 'next/server';
import { main } from "@/prisma/seed"

// Forzar ejecución dinámica para evitar caché
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    // Verificación de seguridad - solo permitir a Vercel Cron
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // Si hay un secret configurado, verificarlo
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        console.warn(`[CRON] Intento de acceso no autorizado desde: ${req.headers.get('x-forwarded-for') || 'IP desconocida'}`);
        return NextResponse.json({
            error: 'No autorizado - Token de cron inválido'
        }, { status: 401 });
    }
    const startTime = new Date();
    console.log(`[CRON] Iniciando ejecución de seed a las: ${startTime.toISOString()}`);

    try {
        // Ejecutar el comando seed
        await main();

        const endTime = new Date();
        const executionTime = endTime.getTime() - startTime.getTime();

        const successMessage = `Seeding completado exitosamente en ${executionTime}ms`;
        console.log(`[CRON] ${successMessage}`);

        return NextResponse.json({
            message: successMessage,
            timestamp: endTime.toISOString(),
            executionTimeMs: executionTime,
            successful: true
        }, { status: 200 });

    } catch (error) {
        const endTime = new Date();
        const executionTime = endTime.getTime() - startTime.getTime();

        const errorMessage = `Error durante el seeding después de ${executionTime}ms: ${error instanceof Error ? error.message : 'Error desconocido'}`;
        console.error(`[CRON] ${errorMessage}`);
        console.error(`[CRON] Stack trace:`, error);

        return NextResponse.json({
            error: errorMessage,
            timestamp: endTime.toISOString(),
            executionTimeMs: executionTime,
            successful: false
        }, { status: 500 });
    }
}
