/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

type AnyFn = (...args: any) => void;

export function useDebounce<T extends AnyFn>(fn: T, delay: number) {
	const timeoutRef = useRef(0);

	const debouncedFn: AnyFn = (...args: any) => {
		window.clearTimeout(timeoutRef.current);

		timeoutRef.current = window.setTimeout(() => {
			fn(...args);
		}, delay);
	};

	return debouncedFn;
}
