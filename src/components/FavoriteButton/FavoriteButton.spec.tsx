import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FavoriteButton } from ".";
import { useFavorite } from "@hooks/useFavorite";
import { CharacterResponse } from "@/interface/character";
import { PlanetResponse } from "@/interface/planet";

vi.mock("@hooks/useFavorite", () => ({
	useFavorite: vi.fn(),
}));

describe("FavoriteButton", () => {
	const mockCharacter: CharacterResponse = {
		name: "Luke Skywalker",
	} as CharacterResponse;
	const mockPlanet: PlanetResponse = { name: "Tatooine" } as PlanetResponse;
	let mockToggleFavorite: vi.Mock;
	let mockIsFavorite: vi.Mock;

	beforeEach(() => {
		mockToggleFavorite = vi.fn();
		mockIsFavorite = vi.fn().mockReturnValue(false);

		(useFavorite as vi.Mock).mockReturnValue({
			isFavorite: mockIsFavorite,
			toggleFavorite: mockToggleFavorite,
		});
	});

	it("calls toggleFavorite when clicked", () => {
		render(<FavoriteButton type="characters" item={mockCharacter} />);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockToggleFavorite).toHaveBeenCalledWith(
			"characters",
			mockCharacter
		);
	});

	it("shows animation effect when favorited", () => {
		render(<FavoriteButton type="planets" item={mockPlanet} />);
		const button = screen.getByRole("button");
		fireEvent.click(button);
		expect(mockToggleFavorite).toHaveBeenCalled();
	});
});
