import { twMerge } from "tailwind-merge";

// Tailwind sınıflarını birleştirirken çakışan sınıfları (p-4 vs p-2) doğru çözümler
export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}
