import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Home } from ".";
import { useGetAllCharacters } from "@queries/character";
import { useGetAllPlanets } from "@queries/planet";
import { useFavorite } from "@hooks/useFavorite";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

vi.mock("@queries/character");
vi.mock("@queries/planet");
vi.mock("@hooks/useFavorite", () => ({
	useFavorite: vi.fn(),
}));

describe("Home Component", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders loading state initially", () => {
		vi.mocked(useGetAllCharacters).mockReturnValue({
			data: null,
			isLoading: true,
		} as never);
		vi.mocked(useGetAllPlanets).mockReturnValue({
			data: null,
			isLoading: true,
		} as never);
		vi.mocked(useFavorite).mockReturnValue({
			getFavorites: vi.fn(() => []), // Retorno válido
		} as never);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		expect(screen.getByTestId("loading")).toBeInTheDocument();
	});

	it("renders fetched data correctly", async () => {
		vi.mocked(useGetAllCharacters).mockReturnValue({
			data: { count: 10 },
			isLoading: false,
		} as never);
		vi.mocked(useGetAllPlanets).mockReturnValue({
			data: { count: 5 },
			isLoading: false,
		} as never);
		vi.mocked(useFavorite).mockReturnValue({
			getFavorites: vi.fn(() => []), // Retorno válido
		} as never);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("10")).toBeInTheDocument();
			expect(screen.getByText("5")).toBeInTheDocument();
			expect(screen.getByText("0")).toBeInTheDocument();
		});
	});

	it("navigates correctly to Characters, Planets, and Favorites pages", async () => {
		vi.mocked(useGetAllCharacters).mockReturnValue({
			data: { count: 10 },
			isLoading: false,
		} as never);
		vi.mocked(useGetAllPlanets).mockReturnValue({
			data: { count: 5 },
			isLoading: false,
		} as never);
		vi.mocked(useFavorite).mockReturnValue({
			getFavorites: () => [],
		} as never);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("View all characters")).toHaveAttribute(
				"href",
				"/characters"
			);
			expect(screen.getByText("View all planets")).toHaveAttribute(
				"href",
				"/planets"
			);
			expect(screen.getByText("View favorites")).toHaveAttribute(
				"href",
				"/favorites"
			);
		});
	});

	it("displays correct number of favorites", async () => {
		vi.mocked(useGetAllCharacters).mockReturnValue({
			data: { count: 10 },
			isLoading: false,
		} as never);
		vi.mocked(useGetAllPlanets).mockReturnValue({
			data: { count: 5 },
			isLoading: false,
		} as never);
		vi.mocked(useFavorite).mockReturnValue({
			getFavorites: (type: string) => (type === "characters" ? [1, 2] : [3]),
		} as never);

		render(
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.getByText("3")).toBeInTheDocument(); // 2 characters + 1 planet
		});
	});
});
