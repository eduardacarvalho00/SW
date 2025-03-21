import { ReactNode } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface ContainerProps {
	children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
	return (
		<main className="w-full h-screen scrollbar overflow-y-auto">
			<Header />
			<section className="py-4 px-8 w-full h-[85%]">{children}</section>
			<MobileNav />
		</main>
	);
};
