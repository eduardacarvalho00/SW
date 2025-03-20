import { PlanetResponse } from "@/interface/planet";
import { Container } from "@components/Container";
import { FavoriteButton } from "@components/FavoriteButton";
import { Pagination } from "@components/Pagination";
import { Card, CardContent, CardFooter, CardLink } from "@components/ui/Card";
import { Input } from "@components/ui/Input";
import { Loading } from "@components/ui/Loading";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/Select";
import { usePagination } from "@hooks/usePagination";
import { useGetAllPlanets } from "@queries/planet";
import { useEffect, useState } from "react";

export const Planet = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [climateFilter, setClimateFilter] = useState<string>("all");
	const {
		handleNextPage,
		handlePrevPage,
		handleTotalItems,
		handleGoToPage,
		page,
		pageLength,
		totalItems,
	} = usePagination();

	const { data: dataPlanets, isLoading: isLoadingCharacter } = useGetAllPlanets(
		{ page: String(page) }
	);
	const [filteredPlanets, setFilteredPlanets] = useState<PlanetResponse[]>(
		dataPlanets ? dataPlanets?.results : []
	);

	const allClimates = Array.from(
		new Set(dataPlanets?.results.map((planet) => planet.climate))
	);

	useEffect(() => {
		if (dataPlanets) {
			handleTotalItems(dataPlanets.count);
		}
		if (dataPlanets?.results && dataPlanets?.results.length === 0) {
			handlePrevPage();
		}
	}, [dataPlanets]);

	useEffect(() => {
		if (dataPlanets) {
			let result = dataPlanets.results;

			if (searchQuery) {
				result = result.filter((char) =>
					char.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}

			if (climateFilter !== "all") {
				result = result.filter((item) => item.climate === climateFilter);
			}

			setFilteredPlanets(result);
		}
	}, [searchQuery, climateFilter, dataPlanets]);

	return (
		<Container>
			<div className="space-y-6 h-vh md:h-full z-0">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Planets</h1>
					<p className="text-[#94a3b8]">
						Explore planets from the Star Wars universe.
					</p>
				</div>

				<div className="flex flex-col gap-4 md:flex-row">
					<div className="flex-1">
						<Input
							placeholder="Search by name..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full"
						/>
					</div>
					<div className="w-full md:w-48">
						<Select value={climateFilter} onValueChange={setClimateFilter}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by gender" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Climates</SelectItem>
								{allClimates.map((climate) => (
									<SelectItem key={climate} value={climate}>
										{climate}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				{isLoadingCharacter ? (
					<div className="h-[70%] max-h-[70%] flex items-center justify-center">
						<Loading />
					</div>
				) : filteredPlanets && filteredPlanets.length > 0 ? (
					<div className="scrollbar overflow-y-auto h-[70%] max-h-[70%]">
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filteredPlanets.map((planet) => {
								const url = planet.url;
								const idplanet = url.match(/\/(\d+)\/$/);

								return (
									<Card key={planet.name} className="overflow-hidden">
										<CardContent className="p-4 gap-2 flex flex-col">
											<div className="flex items-center justify-between">
												<h2 className="text-xl font-bold">{planet.name}</h2>
												<FavoriteButton type="planets" item={planet} />
											</div>

											<div className="flex gap-1.5">
												<p className="text-sm">Climate:</p>
												<p className="text-sm font-medium">{planet.climate}</p>
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
					</div>
				) : (
					<div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
						<h2 className="text-xl font-semibold">No characters found</h2>
						<p>Try adjusting your search or filter criteria</p>
					</div>
				)}
				{!isLoadingCharacter && filteredPlanets.length > 0 && (
					<Pagination
						page={page}
						pageLength={pageLength}
						isLoading={isLoadingCharacter}
						totalItems={totalItems}
						handleGoToPage={handleGoToPage}
						handleNextPage={handleNextPage}
						handlePrevPage={handlePrevPage}
					/>
				)}
			</div>
			<div className="min-h-32 flex md:none" />
		</Container>
	);
};
