import { PaginationProps } from "@/interface/paginations";
import { allCharacters, character } from "@api/starwars";
import { CHARACTERS } from "@constants/entitiesKey";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCharacters = ({ page }: PaginationProps) => {
	return useQuery({
		queryKey: [CHARACTERS, { page }],
		queryFn: () => allCharacters({ page }),
	});
};

export const useGetCharacter = (id: string) => {
	return useQuery({
		queryKey: [CHARACTERS, { id }],
		queryFn: () => character(id),
	});
};
