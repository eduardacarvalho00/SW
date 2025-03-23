"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardLink,
	CardTitle,
} from "@/components/ui/Card";
import { FavoriteButton } from "@components/FavoriteButton";
import { useFavorite } from "@hooks/useFavorite";
import { Container } from "@components/Container";
import { Link } from "react-router-dom";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/Select";

export default function Favorite() {
	const [activeTab, setActiveTab] = useState("characters");
	const { getFavorites } = useFavorite();

	const isCaracterTab = activeTab === "characters";
	const isPlanetTab = activeTab === "planets";
	const isSpecieTab = activeTab === "species";
	return (
		<Container>
			<div className="space-y-6 h-vh md:h-full">
				<div>
					<h1 className="text-3xl font-bold tracking-tight ">Favorites</h1>
					<p className="text-muted-foreground">
						View your favorite characters and planets.
					</p>
				</div>

				<Select
					value={activeTab}
					onValueChange={setActiveTab}
					defaultValue={activeTab}
				>
					<SelectTrigger>
						<SelectValue placeholder="Filter by class" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem key="characters" value="characters">
							Characters
						</SelectItem>
						<SelectItem key="planets" value="planets">
							Planets
						</SelectItem>
						<SelectItem key="species" value="species">
							Species
						</SelectItem>
					</SelectContent>
				</Select>

				{isCaracterTab && (
					<div>
						{getFavorites("characters") &&
						getFavorites("characters").length > 0 ? (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{getFavorites("characters")
									.reverse()
									.map((character) => {
										const url = character.url;
										const idCharacter = url?.match(/\/(\d+)\/$/);

										return (
											<Card key={character.name} className="overflow-hidden">
												<CardContent className="p-4 gap-2 flex flex-col">
													<div className="flex items-center justify-between">
														<h2 className="text-xl font-bold">
															{character.name}
														</h2>
														<FavoriteButton
															type="characters"
															item={character}
														/>
													</div>
													<div className="flex gap-1.5">
														<p className="text-sm">Gender:</p>
														<p className="text-sm font-medium">
															{character.gender}
														</p>
													</div>
													<div className="flex gap-1.5">
														<p className="text-sm">Birth Year:</p>
														<p className="text-sm font-medium">
															{character.birth_year}
														</p>
													</div>
												</CardContent>
												<CardFooter className="p-4 pt-0">
													<CardLink
														href={`/characters${idCharacter && idCharacter[0]}`}
														text="View Details"
													/>
												</CardFooter>
											</Card>
										);
									})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
								<h2 className="text-xl font-semibold">
									No favorite characters
								</h2>
								<p className="text-muted-foreground">
									You haven't added any characters to your favorites yet.
								</p>
								<Button asChild className="mt-4">
									<Link to="/characters">Browse Characters</Link>
								</Button>
							</div>
						)}
					</div>
				)}
				{isPlanetTab && (
					<div>
						{getFavorites("planets") && getFavorites("planets").length > 0 ? (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{getFavorites("planets")
									.reverse()
									.map((planet) => {
										const url = planet.url;
										const idplanet = url?.match(/\/(\d+)\/$/);

										return (
											<Card key={planet.name} className="overflow-hidden">
												<CardContent className="p-4 gap-2 flex flex-col">
													<div className="flex items-center justify-between">
														<h2 className="text-xl font-bold">{planet.name}</h2>
														<FavoriteButton type="planets" item={planet} />
													</div>

													<div className="flex gap-1.5">
														<p className="text-sm">Climate:</p>
														<p className="text-sm font-medium">
															{planet.climate}
														</p>
													</div>
												</CardContent>
												<CardFooter className="p-4 pt-0">
													<CardLink
														href={`/planets${idplanet && idplanet[0]}`}
														text="View Details"
													/>
												</CardFooter>
											</Card>
										);
									})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
								<h2 className="text-xl font-semibold">No favorite planets</h2>
								<p className="text-muted-foreground">
									You haven't added any planets to your favorites yet.
								</p>
								<Button asChild className="mt-4">
									<Link to="/planets">Browse Planets</Link>
								</Button>
							</div>
						)}
					</div>
				)}
				{isSpecieTab && (
					<div>
						{getFavorites("species") && getFavorites("species").length > 0 ? (
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{getFavorites("species")
									.reverse()
									.map((specie) => {
										return (
											<Card
												className="w-full mt-2"
												data-test="specie-details-card"
											>
												<CardHeader>
													<CardTitle>{specie.name}</CardTitle>
												</CardHeader>
												<CardContent className="grid gap-4">
													<div className="grid grid-cols-2 gap-4">
														<div>
															<h3 className="font-semibold">Average height</h3>
															<p className="text-[#94a3b8]">
																{specie.average_height} inch
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Classification</h3>
															<p className="text-[#94a3b8]">
																{specie.classification}
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Designtation</h3>
															<p className="text-[#94a3b8]">
																{specie.designation}
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Eye colors</h3>
															<p className="text-[#94a3b8]">
																{specie.eye_colors}
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Hair colors</h3>
															<p className="text-[#94a3b8]">
																{specie.hair_colors}
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Language</h3>
															<p className="text-[#94a3b8]">
																{specie.language}
															</p>
														</div>
														<div>
															<h3 className="font-semibold">Skin colorsr</h3>
															<p className="text-[#94a3b8]">
																{specie.skin_colors}
															</p>
														</div>
													</div>
												</CardContent>
											</Card>
										);
									})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
								<h2 className="text-xl font-semibold">No favorite Species</h2>
								<p className="text-muted-foreground">
									You haven't added any Species to your favorites yet.
								</p>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
}
