import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { PrismaClient } from "@prisma/client";
import { main } from "@/prisma/seed"

export async function GET(req: NextRequest) {
    try {
        const cron = req.nextUrl.pathname.split('/')[3]
        console.log(cron)
        // Llama a la función main de tu script de seed
        if (db) {
            await main();
        }
        // Devuelve una respuesta exitosa
        return NextResponse.json({ message: 'Seeding completed successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error during seeding:', error);
        // Devuelve una respuesta de error
        return NextResponse.json({ error: 'Error during seeding' }, { status: 500 });
    }
}
