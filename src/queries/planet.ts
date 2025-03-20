import { PaginationProps } from "@/interface/paginations";
import { allPlanets, planet } from "@api/starwars";
import { PLANETS } from "@constants/entitiesKey";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPlanets = ({ page }: PaginationProps) => {
	return useQuery({
		queryKey: [PLANETS, { page }],
		queryFn: () => allPlanets({ page }),
	});
};

export const useGetPlanet = (id: string) => {
	return useQuery({
		queryKey: [PLANETS, { id }],
		queryFn: () => planet(id),
	});
};
