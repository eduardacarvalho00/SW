import { twMerge } from "@utils/twMerge";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface LinkProps {
	href: string;
	title: string;
	Icon?: React.ElementType;
}

export const Link = ({ Icon, href, title }: LinkProps) => {
	const { pathname } = useLocation();

	return (
		<RouterLink
			to={href}
			className={twMerge(
				"flex flex-col items-center justify-center",
				pathname.startsWith(href) ? "text-white" : "text-[#94a3b8]"
			)}
		>
			{Icon && <Icon className="h-4 w-4" />}

			<span className="text-xs">{title}</span>
		</RouterLink>
	);
};
