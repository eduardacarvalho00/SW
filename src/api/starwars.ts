import { CHARACTERS, PLANETS } from "@constants/entitiesKey";
import { axiosInstance } from "./axiosInstace";
import {
	AllCharactersResponse,
	CharacterResponse,
} from "@/interface/character";
import { PaginationProps } from "@/interface/paginations";
import { AllPlanetsResponse, PlanetResponse } from "@/interface/planet";

export async function allCharacters(params: PaginationProps) {
	const { data } = await axiosInstance.get<AllCharactersResponse>(CHARACTERS, {
		params,
	});

	return data;
}

export async function character(id: string) {
	const { data } = await axiosInstance.get<CharacterResponse>(
		`${CHARACTERS}/${id}`
	);

	return data;
}

export async function allPlanets(params: PaginationProps) {
	const { data } = await axiosInstance.get<AllPlanetsResponse>(PLANETS, {
		params,
	});

	return data;
}
export async function planet(id: string) {
	const { data } = await axiosInstance.get<PlanetResponse>(`${PLANETS}/${id}`);

	return data;
}
