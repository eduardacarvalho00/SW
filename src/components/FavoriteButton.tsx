/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { twMerge } from "@utils/twMerge";
import { Button } from "./ui/Button";
import { useFavorite } from "@hooks/useFavorite";
import { CharacterResponse } from "@/interface/character";
import { PlanetResponse } from "@/interface/planet";

interface FavoriteButtonProps {
	type: "characters" | "planets";
	item: CharacterResponse | PlanetResponse;
}

export function FavoriteButton({ item, type }: FavoriteButtonProps) {
	const [favorite, setFavorite] = useState(false);
	const { isFavorite, toggleFavorite } = useFavorite();

	useEffect(() => {
		setFavorite(isFavorite(type, item.name));
	}, [type, item]);

	const handleToggleFavorite = () => {
		const newState = toggleFavorite(type, item);
		setFavorite(newState);
	};

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={handleToggleFavorite}
			className={
				favorite
					? "text-red-500 hover:text-red-600"
					: "text-[#94a3b8] hover:text-foreground"
			}
		>
			<Heart className={twMerge("h-5 w-5", favorite ? "fill-current" : "")} />
			<span className="sr-only">
				{favorite ? "Remove from favorites" : "Add to favorites"}
			</span>
		</Button>
	);
}
