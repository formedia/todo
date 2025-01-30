'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { TodoData } from '@/app/lib/definitions';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
  }),
  amount: z.coerce.number().gt(0, {message: 'Amount must be greater than 0'}),
  status: z.enum(['paid', 'pending'], {
    invalid_type_error: 'Please select a valid status',
  }),
  date: z.string()
});
const CreateInvoce = FormSchema.omit({id: true, date: true});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
  formData?: FormData;
}

export async function createInvoice(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = CreateInvoce.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })
  if (!validatedFields.success) {
    return { 
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice'
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;

  } catch (error) {
    return { message: 'An error occurred while creating the invoice' };
  }
  revalidatePath('/dashboard/invoices');  
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({id: true, date: true});

export async function updateInvoice(id: string, prevState: State, formData: FormData): Promise<State> {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })
  if (!validatedFields.success) {
    return { 
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice'
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  try {
    await sql`UPDATE invoices
      SET customer_id = ${customerId},
          amount = ${amountInCents},
          status = ${status}
      WHERE id = ${id}`;
  } catch (error) {
    return { message: 'An error occurred while updating the invoice' };
  }
  revalidatePath('/dashboard/invoices');  
  redirect('/dashboard/invoices');
} 

export async function deleteInvoice(id: string) {
  // throw new Error('Not implemented');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    //return { message: 'Invoice deleted successfully' };
  } catch (error) {
    // return { message: 'An error occurred while deleting the invoice' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


export async function getTasks(): Promise<TodoData[]> {
  // throw new Error('Not implemented');
  const tasks = await sql`SELECT tasks.id, tasks.user_id, tasks.contnet, tasks.status, tasks.due_date, tasks.created_at, user.name, user FROM tasks JOIN users ON tasks.user_id = users.id`;
  return tasks.rows as TodoData[];
}