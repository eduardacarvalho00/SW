import { ArrowLeft, Globe } from "lucide-react";
import { Container } from "@components/Container";
import { Link, useParams } from "react-router-dom";
import { useGetCharacter } from "@queries/character";
import { useGetPlanet } from "@queries/planet";
import { Button } from "@components/ui/Button";
import { FavoriteButton } from "@components/FavoriteButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardLink,
	CardTitle,
} from "@components/ui/Card";
import { Loading } from "@components/ui/Loading";

export const CharacterDetails = () => {
	const { characterId } = useParams();
	const { data: character, isLoading: isLoadingCharacter } = useGetCharacter(
		String(characterId)
	);
	const splitHomeworld = character && character.homeworld.split("/");
	const homeworldId =
		splitHomeworld && splitHomeworld[splitHomeworld.length - 2];
	const { data: homeworld, isLoading: isLoadingHomeWorld } = useGetPlanet(
		String(homeworldId)
	);

	if (isLoadingCharacter) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (!character) {
		return (
			<Container>
				<div className="container pt-20 pb-16">
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
						<h2 className="text-xl font-semibold">Character not found</h2>
						<p className="text-[#94a3b8]">
							The character you're looking for doesn't exist
						</p>
						<Button className="mt-4">
							<Link to="/characters">Back to Characters</Link>
						</Button>
					</div>
				</div>
			</Container>
		);
	}

	return (
		<Container>
			<div className="space-y-6 h-vh md:h-full">
				<div className="flex items-center gap-4">
					<Link to="/characters">
						<Button variant="outline" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>

					<h1 className="text-3xl font-bold tracking-tight">
						{character.name}
					</h1>
					<FavoriteButton type="characters" item={character} />
				</div>

				<div className="space-x-6 flex flex-col md:flex-row gap-1.5">
					<Card className="w-full md:w-[50%]">
						<CardHeader>
							<CardTitle>Character Details</CardTitle>
							<CardDescription>
								Information about {character.name}
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="font-semibold">Species</h3>
									<p className="text-[#94a3b8]">{character.species}</p>
								</div>
								<div>
									<h3 className="font-semibold">Gender</h3>
									<p className="text-[#94a3b8]">{character.gender}</p>
								</div>
								<div>
									<h3 className="font-semibold">Birth Year</h3>
									<p className="text-[#94a3b8]">{character.birth_year}</p>
								</div>
								<div>
									<h3 className="font-semibold">Height</h3>
									<p className="text-[#94a3b8]">{character.height} inch</p>
								</div>
								<div>
									<h3 className="font-semibold">Mass</h3>
									<p className="text-[#94a3b8]">{character.mass} lb</p>
								</div>
								<div>
									<h3 className="font-semibold">Hair Color</h3>
									<p className="text-[#94a3b8]">{character.hair_color}</p>
								</div>
								<div>
									<h3 className="font-semibold">Eye Color</h3>
									<p className="text-[#94a3b8]">{character.eye_color}</p>
								</div>
							</div>

							<div>
								<h3 className="font-semibold">Films</h3>
								<div className="flex flex-wrap gap-2 mt-2">
									{character.films.map((film) => (
										<span
											key={film}
											className="rounded-full bg-secondary px-3 py-1 text-xs"
										>
											{film}
										</span>
									))}
								</div>
							</div>
						</CardContent>
					</Card>

					{(isLoadingHomeWorld || homeworld) && (
						<Card className="w-full md:w-[50%] flex flex-col justify-between">
							<div>
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<Globe className="h-5 w-5" />
										Home World
									</CardTitle>
									<CardDescription>Planet of origin</CardDescription>
								</CardHeader>

								{isLoadingHomeWorld ? (
									<Loading />
								) : (
									homeworld && (
										<CardContent className="space-y-4">
											<h3 className="text-xl font-semibold">
												{homeworld.name}
											</h3>
											<div className="grid grid-cols-2 gap-4">
												<div>
													<h4 className="font-semibold">Climate</h4>
													<p className="text-[#94a3b8]">{homeworld.climate}</p>
												</div>
												<div>
													<h4 className="font-semibold">Terrain</h4>
													<p className="text-[#94a3b8]">{homeworld.terrain}</p>
												</div>
												<div>
													<h4 className="font-semibold">Population</h4>
													<p className="text-[#94a3b8]">
														{homeworld.population}
													</p>
												</div>
											</div>
										</CardContent>
									)
								)}
							</div>
							<CardFooter>
								<CardLink href={`/planets/${homeworldId}`} text="View Planet" />
							</CardFooter>
						</Card>
					)}
				</div>
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
};
