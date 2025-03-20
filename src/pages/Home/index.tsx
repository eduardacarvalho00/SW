import { Container } from "@components/Container";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardLink,
	CardTitle,
} from "@components/ui/Card";
import { Loading } from "@components/ui/Loading";
import { useFavorite } from "@hooks/useFavorite";
import { useGetAllCharacters } from "@queries/character";
import { useGetAllPlanets } from "@queries/planet";
import { Users, Globe, Heart } from "lucide-react";

export const Home = () => {
	const { data: currentCharacters, isLoading: isLoadingCharacters } =
		useGetAllCharacters({ page: "1" });
	const { data: currentPlanets, isLoading: isLoadingPlanets } =
		useGetAllPlanets({ page: "1" });

	const { getFavorites } = useFavorite();

	return isLoadingCharacters || isLoadingPlanets ? (
		<div className="h-screen w-full flex items-center justify-center">
			<Loading />
		</div>
	) : (
		<Container>
			<div className="space-y-6 h-full justify-center flex flex-col">
				<p className="font-medium text-xl">
					Welcome to the Star Wars Explorer. Discover characters and planets
					from the Star Wars universe.
				</p>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Characters</CardTitle>
							<Users className="h-4 w-4 text-[#94a3b8]" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{currentCharacters?.count}
							</div>
							<p className="text-xs text-[#94a3b8]">
								Explore characters from the Star Wars universe
							</p>
						</CardContent>
						<CardFooter>
							<CardLink href="/characters" text="View all characters" />
						</CardFooter>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Planets</CardTitle>
							<Globe className="h-4 w-4 text-[#94a3b8]" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{currentPlanets?.count}</div>
							<p className="text-xs text-[#94a3b8]">
								Discover planets from the Star Wars universe
							</p>
						</CardContent>
						<CardFooter>
							<CardLink href="/planets" text="View all planets" />
						</CardFooter>
					</Card>

					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Favorites</CardTitle>
							<Heart className="h-4 w-4 text-[#94a3b8]" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{getFavorites("planets").length +
									getFavorites("characters").length}
							</div>
							<p className="text-xs text-[#94a3b8]">
								View your favorite characters and planets
							</p>
						</CardContent>
						<CardFooter>
							<CardLink href="/favorites" text="View favorites" />
						</CardFooter>
					</Card>
				</div>

				<div className="rounded-lg border-[1px] border-[#27272a] bg-card p-6">
					<div className="flex flex-col space-y-4">
						<h2 className="text-xl font-bold">About Star Wars Explorer</h2>
						<p className="text-[#94a3b8]">
							This application allows you to explore characters and planets from
							the Star Wars universe. You can filter and search for specific
							characters or planets, view detailed information, and save your
							favorites for quick access.
						</p>

						<h3 className="font-semibold">Get Started</h3>
						<p className="text-sm text-[#94a3b8]">
							Click on the cards above to start exploring the Star Wars
							universe. Use the navigation bar to switch between different
							sections of the application.
						</p>
					</div>
				</div>
			</div>
		</Container>
	);
};
