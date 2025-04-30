import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number): string {
  const formattedNumber = value.toLocaleString("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  });

  return formattedNumber;
}

export function checkNumberAndUpdateToComma(value: string): string {
  'use strict';

  const newValue = value.replace('.', ',');

  if (!isNaN(parseFloat(newValue))) return newValue;

  return value;
}

export function checkNumberAndUpdateToDot(value: string): string {
  'use strict';

  const newValue = value.replace(',', '.');

  if (!isNaN(parseFloat(newValue))) return newValue;

  return value;
}

