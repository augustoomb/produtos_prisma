import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { revalidatePath } from 'next/cache';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// POST, PUT, DELETE
export async function reqApi(method: string, body: any, model: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${model}`, {
      method: method,
      body: JSON.stringify(body) ?? null,
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      return {
          status: "error",
          errors: { erro: "Erro. Verifique a disponibilidade do seu banco de dados." },
      }
  }

  await response.json();

  revalidatePath(`/dash/${model}`);

  return {
      status: "success",
      errors: {},
  }       
}

// GET
export async function getApi(model: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${model}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
    if (!response.ok) {
        return {
            status: "error",
            errors: { erro: "Erro. Verifique a disponibilidade do seu banco de dados." },
        }
    }
  
    const data = await response.json();
    return data
}
