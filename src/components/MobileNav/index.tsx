import { Heart, Home, Users, Globe } from "lucide-react";
import { Link } from "./Link";

export function MobileNav() {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-[#0a0a0a] backdrop-blur-md md:hidden">
			<div className="flex h-16 items-center justify-around">
				<Link href="/" title="Home" Icon={Home} />

				<Link href="/characters" title="Characters" Icon={Users} />
				<Link href="/planets" title="Planets" Icon={Globe} />
				<Link href="/favorites" title="Favorites" Icon={Heart} />
			</div>
		</div>
	);
}
