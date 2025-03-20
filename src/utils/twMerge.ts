import { type ClassValue, clsx } from "clsx";
import { twMerge as TailwindMerge } from "tailwind-merge";

export function twMerge(...inputs: ClassValue[]) {
	return TailwindMerge(clsx(inputs));
}
