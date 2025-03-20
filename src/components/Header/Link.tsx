import { twMerge } from "@utils/twMerge";
import { HTMLAttributes } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface LinkProps extends HTMLAttributes<HTMLSpanElement> {
	href: string;
	title: string;
	Icon?: React.ElementType;
}

export const Link = ({ Icon, href, title, ...rest }: LinkProps) => {
	const { pathname } = useLocation();

	return (
		<RouterLink
			to={href}
			role="button"
			className={twMerge(
				"text-sm font-medium transition-colors hover:text-white",
				href === pathname || pathname.startsWith(href + "/")
					? "text-white"
					: "text-[#94a3b8]"
			)}
		>
			<div className="flex items-center gap-1">
				{Icon && <Icon className="h-4 w-4" />}

				<span {...rest}>{title}</span>
			</div>
		</RouterLink>
	);
};
