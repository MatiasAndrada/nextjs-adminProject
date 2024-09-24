import { NextResponse, NextRequest } from 'next/server';
import { main } from "@/prisma/seed"

export async function GET(req: NextRequest) {
    try {
        await main();

        // Devuelve una respuesta exitosa
        return NextResponse.json({ message: 'Seeding completed successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error during seeding:', error);
        // Devuelve una respuesta de error
        return NextResponse.json({ error: 'Error during seeding' }, { status: 500 });
    }
}
