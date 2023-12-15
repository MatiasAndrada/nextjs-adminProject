import { prisma } from "@/app/lib/prisma"
/* import { hash } from "bcryptjs"
 */import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {

        const { name, email, password } = await (await req.json()) as {
            name: string
            email: string
            password: string
        }


        const user = await prisma.user.create({
            data: {
                name,
                email,
            }

        });

        return NextResponse.json({
            user: {
                name: user.name,
                email: user.email,
            }
        })
    }
    catch (error: any) {
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}