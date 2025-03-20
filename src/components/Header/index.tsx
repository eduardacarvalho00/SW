import { Heart, Home, LogOut, User, Users, Globe } from "lucide-react";
import { Link } from "./Link";
import { Button } from "@components/ui/Button";

export function Header() {
	return (
		<header className="border-b-[1px] border-b-gray-400  w-full py-6 px-8 ">
			<div className="w-full flex  items-center justify-between">
				<div className="flex gap-10">
					<Link
						href="/"
						title="Star Wars Explorer"
						className="font-bold text-[18px] text-white"
					/>
					<div className="hidden md:flex items-center gap-10">
						<nav className="flex gap-6">
							<Link href="/" title="Home" Icon={Home} />
							<Link href="/characters" title="Characters" Icon={Users} />
							<Link href="/planets" title="Planets" Icon={Globe} />
							<Link href="/favorites" title="Favorites" Icon={Heart} />
						</nav>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon">
						<User className="h-5 w-5" />
					</Button>
					<Button variant="ghost" size="icon">
						<LogOut className="h-5 w-5" />
					</Button>
				</div>
			</div>
		</header>
	);
}
