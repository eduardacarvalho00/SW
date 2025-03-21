describe("Planets Page", () => {
	const mockPlanets = {
		results: [
			{
				name: "Tatooine",
				climate: "arid",
				url: "https://swapi.dev/api/planets/1/",
			},
			{
				name: "Hoth",
				climate: "frozen",
				url: "https://swapi.dev/api/planets/2/",
			},
		],
		count: 60,
	};

	beforeEach(() => {
		cy.intercept("GET", "**/api/planets*", { body: mockPlanets }).as(
			"getPlanets"
		);
		cy.visit("/planets");
	});

	context("Initial Load", () => {
		it("should display the page title and description", () => {
			cy.contains("h1", "Planets").should("be.visible");
			cy.contains("p", "Explore planets from the Star Wars universe");
		});

		it("should load and display initial planets", () => {
			cy.getByData("planet-card").should("have.length", 2);
			cy.contains("Tatooine").should("be.visible");
			cy.contains("Hoth").should("be.visible");
		});

		it("should show loading state during initial load", () => {
			cy.intercept("GET", "**/api/planets*", {
				delay: 1000,
				body: mockPlanets,
			});
			cy.visit("/planets");
			cy.getByData("loading").should("be.visible");
		});
	});

	context("Search Functionality", () => {
		it("should filter planets by name", () => {
			cy.getByData("search-input").type("tat");
			cy.getByData("planet-card").should("have.length", 1);
			cy.contains("Tatooine").should("be.visible");
		});

		it("should display empty state when no matches found", () => {
			cy.intercept("GET", "**/api/planets*", {
				body: { results: [], count: 0 },
			});
			cy.getByData("search-input").type("invalidplanet");
			cy.getByData("empty-state").should("contain", "No planets found");
		});
	});
});
