import { ArrowLeft, Users } from "lucide-react";
import { Container } from "@components/Container";
import { Link, useParams } from "react-router-dom";
import { useGetPlanet } from "@queries/planet";
import { Button } from "@components/ui/Button";
import { FavoriteButton } from "@components/FavoriteButton";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/Card";
import { Loading } from "@components/ui/Loading";
import { useQuery } from "@tanstack/react-query";
import { character, film } from "@api/starwars";
import { CHARACTERS, FILMS } from "@constants/entitiesKey";

export const PlanetDetails = () => {
	const { planetId } = useParams();
	const { data: planet, isLoading: isLoadingPlanet } = useGetPlanet(
		String(planetId)
	);

	const residentsIds = planet?.residents.map((url) => {
		const match = url.match(/(\d+)\/$/);
		return match ? parseInt(match[1]) : null;
	});

	const { data: residentsData, isLoading: isLoadingResidents } = useQuery({
		queryKey: [CHARACTERS, { residentsIds }],
		queryFn: async () => {
			if (residentsIds) {
				const results = await Promise.all(
					residentsIds.map((id) => character(String(id)))
				);
				return results;
			}
		},
		enabled: residentsIds !== undefined && residentsIds.length > 0,
	});

	const filmsIds = planet?.films.map((url) => {
		const match = url.match(/(\d+)\/$/);
		return match ? parseInt(match[1]) : null;
	});

	const { data: filmsData, isLoading: isLoadingFilms } = useQuery({
		queryKey: [FILMS, { filmsIds }],
		queryFn: async () => {
			if (filmsIds) {
				const results = await Promise.all(
					filmsIds.map((id) => film(String(id)))
				);
				return results;
			}
		},
		enabled: filmsIds !== undefined && filmsIds.length > 0,
	});

	if (isLoadingPlanet) {
		return (
			<div className="h-screen flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	if (!planet) {
		return (
			<Container>
				<div className="container pt-20 pb-16">
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
						<h2 className="text-xl font-semibold">Planet not found</h2>
						<p className="text-[#94a3b8]">
							The planet you're looking for doesn't exist
						</p>
						<Button className="mt-4">
							<Link to="/planets">Back to Planets</Link>
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
					<Link to="/planets">
						<Button variant="outline" size="icon">
							<ArrowLeft className="h-4 w-4" />
						</Button>
					</Link>

					<h1 className="text-3xl font-bold tracking-tight">{planet.name}</h1>
					<FavoriteButton type="planets" item={planet} />
				</div>

				<div className="space-x-6 flex flex-col md:flex-row gap-1.5">
					<Card className="w-full md:w-[50%]">
						<CardHeader>
							<CardTitle>Planet Details</CardTitle>
							<CardDescription>Information about {planet.name}</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<h3 className="font-semibold">Climate</h3>
									<p className="text-[#94a3b8]">{planet.climate}</p>
								</div>
								<div>
									<h3 className="font-semibold">Terrain</h3>
									<p className="text-[#94a3b8]">{planet.terrain}</p>
								</div>
								<div>
									<h3 className="font-semibold">Population</h3>
									<p className="text-[#94a3b8]">{planet.population}</p>
								</div>
								<div>
									<h3 className="font-semibold">Diameter</h3>
									<p className="text-[#94a3b8]">{planet.diameter} km</p>
								</div>
								<div>
									<h3 className="font-semibold">Gravity</h3>
									<p className="text-[#94a3b8]">{planet.gravity}</p>
								</div>
								<div>
									<h3 className="font-semibold">Orbital Period</h3>
									<p className="text-[#94a3b8]">{planet.orbital_period} days</p>
								</div>
								<div>
									<h3 className="font-semibold">Rotation Period</h3>
									<p className="text-[#94a3b8]">
										{planet.rotation_period} hours
									</p>
								</div>
								<div>
									<h3 className="font-semibold">Surface water</h3>
									<p className="text-[#94a3b8]">
										{planet.rotation_period} hours
									</p>
								</div>
							</div>

							<div>
								<h3 className="font-semibold">Films</h3>
								<div className="flex flex-wrap gap-2 mt-2">
									{isLoadingFilms && <Loading />}
									{filmsData &&
										filmsData.map((film) => (
											<span
												key={film.title}
												className="rounded-full bg-gray-500 px-3 py-1 text-xs"
											>
												{film.title}
											</span>
										))}
								</div>
							</div>
						</CardContent>
					</Card>
					{!residentsData && !isLoadingResidents && (
						<Card className="w-full md:w-[50%]">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Residents
								</CardTitle>
								<CardDescription>Characters from this planet</CardDescription>
							</CardHeader>
							<CardContent className="flex items-center justify-center h-[80%]">
								<p className="text-[#94a3b8]">No Residents in this planet</p>
							</CardContent>
						</Card>
					)}

					{(isLoadingResidents || residentsData) && (
						<Card className="w-full md:w-[50%]">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Users className="h-5 w-5" />
									Residents
								</CardTitle>
								<CardDescription>Characters from this planet</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{isLoadingResidents ? (
									<Loading />
								) : (
									residentsData &&
									residentsData.map((resident) => {
										const url = resident.url;
										const idCharacter = url.match(/\/(\d+)\/$/);
										return (
											<div
												key={resident.name}
												className="flex items-center justify-between"
											>
												<h4 className="font-semibold">{resident.name}</h4>

												<Button variant="default">
													<Link
														to={`/characters${idCharacter && idCharacter[0]}`}
													>
														View
													</Link>
												</Button>
											</div>
										);
									})
								)}
							</CardContent>
						</Card>
					)}
				</div>
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
};
