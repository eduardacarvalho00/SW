import { twMerge } from "@utils/twMerge";
import React, { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={twMerge(
					"flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm  placeholder:text-amber-50  disabled:cursor-not-allowed disabled:opacity-50 border-[1px] border-[#27272a]",
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = "Input";

export { Input };
