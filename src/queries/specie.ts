import { specie } from "@api/starwars";
import { SPECIE } from "@constants/entitiesKey";
import { useQuery } from "@tanstack/react-query";

export const useGetSpecie = (id: string) => {
	return useQuery({
		queryKey: [SPECIE, { id }],
		queryFn: () => specie(id),
	});
};
