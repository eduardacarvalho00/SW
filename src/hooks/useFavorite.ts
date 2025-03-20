/* eslint-disable @typescript-eslint/no-explicit-any */
export const useFavorite = () => {
	function getFavorites(type: "characters" | "planets"): any[] {
		if (typeof window === "undefined") return [];

		const favorites = localStorage.getItem(`favorites-${type}`);
		return favorites ? JSON.parse(favorites) : [];
	}

	function toggleFavorite(type: "characters" | "planets", item: any): boolean {
		if (typeof window === "undefined") return false;

		const favorites = getFavorites(type);
		const isFavorite = favorites.some((fav) => fav.name === item.name);

		let newFavorites;
		if (isFavorite) {
			newFavorites = favorites.filter((fav) => fav.name !== item.name);
		} else {
			newFavorites = [...favorites, item];
		}

		localStorage.setItem(`favorites-${type}`, JSON.stringify(newFavorites));
		return !isFavorite;
	}

	function isFavorite(type: "characters" | "planets", name: string): boolean {
		if (typeof window === "undefined") return false;

		const favorites = getFavorites(type);
		return favorites.some((fav) => fav.name === name);
	}

	return { isFavorite, toggleFavorite, getFavorites };
};
