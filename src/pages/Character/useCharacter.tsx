import { usePagination } from "@hooks/usePagination";
import { useGetAllCharacters, useGetCharacter } from "@queries/character";
import { useEffect, useState } from "react";
import { CharacterResponse } from "@/interface/character";
import { useParams } from "react-router-dom";
import { useGetPlanet } from "@queries/planet";
import { useQuery } from "@tanstack/react-query";
import { film, specie } from "@api/starwars";
import { FILMS } from "@constants/entitiesKey";

export const useCharacter = () => {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [genderFilter, setGenderFilter] = useState<string>("all");
	const {
		handleNextPage,
		handlePrevPage,
		handleTotalItems,
		handleGoToPage,
		page,
		pageLength,
		totalItems,
	} = usePagination();

	const { data: dataCharacter, isLoading: isLoadingCharacter } =
		useGetAllCharacters({ page: String(page) });
	const [filteredCharacters, setFilteredCharacters] = useState<
		CharacterResponse[]
	>(dataCharacter ? dataCharacter?.results : []);

	const allGenders = Array.from(
		new Set(dataCharacter?.results.map((char) => char.gender))
	);

	useEffect(() => {
		if (dataCharacter) {
			handleTotalItems(dataCharacter.count);
		}
		if (dataCharacter?.results && dataCharacter?.results.length === 0) {
			handlePrevPage();
		}
	}, [dataCharacter]);

	useEffect(() => {
		if (dataCharacter) {
			let result = dataCharacter.results;

			if (searchQuery) {
				result = result.filter((char) =>
					char.name.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}

			if (genderFilter !== "all") {
				result = result.filter((char) => char.gender === genderFilter);
			}

			setFilteredCharacters(result);
		}
	}, [searchQuery, genderFilter, dataCharacter]);

	useEffect(() => {
		setSearchQuery("");
		setGenderFilter("all");
	}, [page]);

	const { characterId } = useParams();
	const { data: character, isLoading: isLoadingDetailsCharacter } =
		useGetCharacter(String(characterId));

	const splitHomeworld = character && character.homeworld.split("/");
	const homeworldId =
		splitHomeworld && splitHomeworld[splitHomeworld.length - 2];
	const { data: homeworld, isLoading: isLoadingHomeWorld } = useGetPlanet(
		String(homeworldId)
	);

	const filmsIds = character?.films.map((url) => {
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

	const speciesIds = character?.species.map((url) => {
		const match = url.match(/(\d+)\/$/);
		return match ? parseInt(match[1]) : null;
	});

	const { data: speciesData, isLoading: isLoadingSpecies } = useQuery({
		queryKey: [FILMS, { speciesIds }],
		queryFn: async () => {
			if (speciesIds) {
				const results = await Promise.all(
					speciesIds.map((id) => specie(String(id)))
				);
				return results;
			}
		},
		enabled: speciesIds !== undefined && speciesIds.length > 0,
	});

	return {
		isLoadingSpecies,
		speciesData,
		searchQuery,
		setSearchQuery,
		genderFilter,
		setGenderFilter,
		allGenders,
		isLoadingCharacter,
		filteredCharacters,
		page,
		pageLength,
		totalItems,
		handleGoToPage,
		handleNextPage,
		handlePrevPage,
		character,
		isLoadingDetailsCharacter,
		filmsData,
		isLoadingFilms,
		homeworld,
		isLoadingHomeWorld,
		homeworldId,
	};
};
