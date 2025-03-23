import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Character } from ".";
import { useCharacter } from "./useCharacter";
import "@testing-library/jest-dom";

// Mockando o hook useCharacter
vi.mock("./useCharacter", () => ({
	useCharacter: vi.fn(),
}));

describe("Character Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders loading state initially", () => {
		vi.mocked(useCharacter).mockReturnValue({
			isLoadingCharacter: true,
			filteredCharacters: [],
			searchQuery: "",
			setSearchQuery: vi.fn(),
			genderFilter: "all",
			setGenderFilter: vi.fn(),
			allGenders: [],
			page: 1,
			pageLength: 1,
			totalItems: 0,
			handleGoToPage: vi.fn(),
			handleNextPage: vi.fn(),
			handlePrevPage: vi.fn(),
			character: undefined,
			isLoadingDetailsCharacter: false,
			filmsData: undefined,
			isLoadingFilms: false,
			homeworld: undefined,
			isLoadingHomeWorld: false,
			homeworldId: undefined,
			isLoadingSpecies: false,
			speciesData: undefined,
		});

		render(
			<MemoryRouter>
				<Character />
			</MemoryRouter>
		);

		expect(screen.getByTestId("loading")).toBeInTheDocument();
	});

	it("renders fetched characters correctly", async () => {
		vi.mocked(useCharacter).mockReturnValue({
			isLoadingCharacter: false,
			filteredCharacters: [
				{
					name: "Luke Skywalker",
					gender: "male",
					birth_year: "19BBY",
					url: "/people/1/",
					eye_color: "",
					hair_color: "",
					height: "",
					homeworld: "",
					mass: "",
					skin_color: "",
					created: "",
					edited: "",
					species: [],
					starships: [],
					vehicles: [],
					films: [],
				},
			],
			searchQuery: "",
			setSearchQuery: vi.fn(),
			genderFilter: "all",
			setGenderFilter: vi.fn(),
			allGenders: ["male", "female"],
			page: 1,
			pageLength: 1,
			totalItems: 1,
			handleGoToPage: vi.fn(),
			handleNextPage: vi.fn(),
			handlePrevPage: vi.fn(),
			character: undefined,
			isLoadingDetailsCharacter: false,
			filmsData: undefined,
			isLoadingFilms: false,
			homeworld: undefined,
			isLoadingHomeWorld: false,
			homeworldId: undefined,
			isLoadingSpecies: false,
			speciesData: undefined,
		});

		render(
			<MemoryRouter>
				<Character />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
			expect(screen.getByText("Gender:")).toBeInTheDocument();
			expect(screen.getByText("male")).toBeInTheDocument();
			expect(screen.getByText("Birth Year:")).toBeInTheDocument();
			expect(screen.getByText("19BBY")).toBeInTheDocument();
		});
	});

	it("renders empty state when no characters match", () => {
		vi.mocked(useCharacter).mockReturnValue({
			isLoadingCharacter: false,
			filteredCharacters: [],
			searchQuery: "",
			setSearchQuery: vi.fn(),
			genderFilter: "all",
			setGenderFilter: vi.fn(),
			allGenders: ["male", "female"],
			page: 1,
			pageLength: 1,
			totalItems: 0,
			handleGoToPage: vi.fn(),
			handleNextPage: vi.fn(),
			handlePrevPage: vi.fn(),
			character: undefined,
			isLoadingDetailsCharacter: false,
			filmsData: undefined,
			isLoadingFilms: false,
			homeworld: undefined,
			isLoadingHomeWorld: false,
			homeworldId: undefined,
			isLoadingSpecies: false,
			speciesData: undefined,
		});

		render(
			<MemoryRouter>
				<Character />
			</MemoryRouter>
		);

		expect(screen.getByText("No characters found")).toBeInTheDocument();
	});

	it("updates search query when input changes", () => {
		const mockSetSearchQuery = vi.fn();
		vi.mocked(useCharacter).mockReturnValue({
			isLoadingCharacter: false,
			filteredCharacters: [],
			searchQuery: "",
			setSearchQuery: mockSetSearchQuery,
			genderFilter: "all",
			setGenderFilter: vi.fn(),
			allGenders: ["male", "female"],
			page: 1,
			pageLength: 1,
			totalItems: 0,
			handleGoToPage: vi.fn(),
			handleNextPage: vi.fn(),
			handlePrevPage: vi.fn(),
			character: undefined,
			isLoadingDetailsCharacter: false,
			filmsData: undefined,
			isLoadingFilms: false,
			homeworld: undefined,
			isLoadingHomeWorld: false,
			homeworldId: undefined,
			isLoadingSpecies: false,
			speciesData: undefined,
		});

		render(
			<MemoryRouter>
				<Character />
			</MemoryRouter>
		);

		const input = screen.getByPlaceholderText("Search by name...");
		fireEvent.change(input, { target: { value: "Leia" } });

		expect(mockSetSearchQuery).toHaveBeenCalledWith("Leia");
	});
});
