import { usePagination } from "@hooks/usePagination";
import { useGetAllPlanets } from "@queries/planet";
import { useEffect, useState } from "react";
import { PlanetResponse } from "@/interface/planet";

export const usePlanet = () => {
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

	return {
		allClimates,
		searchQuery,
		setSearchQuery,
		climateFilter,
		isLoadingCharacter,
		filteredPlanets,
		page,
		pageLength,
		totalItems,
		handleGoToPage,
		handleNextPage,
		setClimateFilter,
		handlePrevPage,
	};
};
