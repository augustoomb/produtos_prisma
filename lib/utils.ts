import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { revalidatePath } from 'next/cache';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher(method: string, body: any | null, model: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${model}`, {
      method: method,
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json',
      },
  });

  if (!response.ok) {
      return {
          status: "error",
          errors: { erro: "Erro ao criar. Verifique a disponibilidade do seu banco de dados." },
      }
  }

  await response.json();

  revalidatePath(`/dash/${model}`);

  return {
      status: "success",
      errors: {},
  }       
}