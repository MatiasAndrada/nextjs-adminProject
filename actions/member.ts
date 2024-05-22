"use server";

import * as z from "zod";
//schemas
import { MemberSchema } from "@/schemas/member";
//hooks
import { currentRole } from "@/hooks/use-current-role";
//types
import { Role } from "@prisma/client";

export async function invite_member(data: z.infer<typeof MemberSchema>) {
    const role = currentRole();
    if (role !== Role.ADMIN) {
        return { error: "You are not authorized to invite a member" };
    }


    return { success: "Member invited!" };

}
