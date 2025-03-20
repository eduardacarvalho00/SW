import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Header } from ".";
import "@testing-library/jest-dom";

describe("Header Component", () => {
	it("should render the header with title", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		expect(screen.getByText("Star Wars Explorer")).toBeInTheDocument();
	});

	it("should render all navigation links", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Characters")).toBeInTheDocument();
		expect(screen.getByText("Planets")).toBeInTheDocument();
		expect(screen.getByText("Favorites")).toBeInTheDocument();
	});
	it("should render user and logout buttons", () => {
		render(
			<MemoryRouter>
				<Header />
			</MemoryRouter>
		);
		expect(screen.getByRole("button", { name: /user/i })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
	});
});
