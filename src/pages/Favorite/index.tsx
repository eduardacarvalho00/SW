"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter, CardLink } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorite } from "@hooks/useFavorite";
import { Container } from "@components/Container";
import { Link } from "react-router-dom";

type TypeTabName = "characters" | "planets";

export default function Favorite() {
	const [activeTab, setActiveTab] = useState<TypeTabName>("characters");
	const { getFavorites } = useFavorite();

	const isCaracterTab = activeTab === "characters";
	const isPlanetTab = activeTab === "planets";
	return (
		<Container>
			<div className="space-y-6 h-vh md:h-full">
				<div>
					<h1 className="text-3xl font-bold tracking-tight ">Favorites</h1>
					<p className="text-muted-foreground">
						View your favorite characters and planets.
					</p>
				</div>

				<Tabs defaultValue="characters">
					<TabsList className="grid w-full grid-cols-2 bg-[#27272a]">
						<TabsTrigger
							className={`bg-${isCaracterTab ? "[#010101]" : "[#27272a]"} cursor-pointer`}
							value="characters"
							onClick={() => setActiveTab("characters")}
						>
							Characters
						</TabsTrigger>
						<TabsTrigger
							className={`bg-${isPlanetTab ? "[#010101]" : "[#27272a]"}  cursor-pointer`}
							value="planets"
							onClick={() => setActiveTab("planets")}
						>
							Planets
						</TabsTrigger>
					</TabsList>

					{isCaracterTab && (
						<TabsContent value="characters" className="mt-6">
							{getFavorites("characters") &&
							getFavorites("characters").length > 0 ? (
								<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{getFavorites("characters").map((character) => {
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
						</TabsContent>
					)}
					{isPlanetTab && (
						<TabsContent value="planets" className="mt-6">
							{getFavorites("planets") && getFavorites("planets").length > 0 ? (
								<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
									{getFavorites("planets").map((planet) => {
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
						</TabsContent>
					)}
				</Tabs>
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
}
