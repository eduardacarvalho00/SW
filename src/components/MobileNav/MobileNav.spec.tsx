import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { MobileNav } from ".";
import "@testing-library/jest-dom";

describe("MobileNav Component", () => {
	it("should render all navigation links", () => {
		render(
			<MemoryRouter>
				<MobileNav />
			</MemoryRouter>
		);
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Characters")).toBeInTheDocument();
		expect(screen.getByText("Planets")).toBeInTheDocument();
		expect(screen.getByText("Favorites")).toBeInTheDocument();
	});
});
