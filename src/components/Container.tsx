import { ReactNode } from "react";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

interface ContainerProps {
	children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
	return (
		<main className="w-full h-screen">
			<Header />
			<section className="py-4 px-8 w-full h-[90%]">{children}</section>
			<MobileNav />
		</main>
	);
};
