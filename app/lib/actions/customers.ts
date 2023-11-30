"use server"

import { z } from "zod"
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    name: z.string({
        invalid_type_error: 'Please enter a name.',
    }),
    email: z.string({
        invalid_type_error: 'Please enter an email.',
    }),
    phone: z.string({
        invalid_type_error: 'Please enter a phone number.',
    }),
});

const create_customer = FormSchema.omit({ id: true })

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
    };
    message?: string | null;
};

//!create customer 
export async function createCustomer(prevState: State, formData: FormData) {
    console.log(0, "create customer")
    //Validate form using Zod
    const validatedFields = create_customer.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone')
    });
    console.log(validatedFields)

    //id form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        console.log("validation failed in create customer")
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Customer.',
        };
    }

    //Prepare data for insertion into the database
    const { name, email, phone } = validatedFields.data;

    //Insert data into the database
    try {
        console.log("inserting data into database")
        await sql`
        INSERT INTO customers (name, email, phone)
        VALUES (${name}, ${email}, ${phone})
        `;
    } catch (err) {
        console.log(err)
        return { message: 'Database Error: Failed to Create Customer.' }
    }
    //revalidate the cache for customer page and redirect to customer page
    revalidatePath('/customers');
    redirect('/customers');
} 