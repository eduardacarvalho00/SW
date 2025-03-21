describe("Planet Details Page", () => {
	const mockPlanet = {
		name: "Tatooine",
		climate: "arid",
		terrain: "desert",
		population: "200000",
		diameter: "10465",
		gravity: "1 standard",
		orbital_period: "304",
		rotation_period: "23",
		surface_water: "1",
		residents: [
			"https://swapi.dev/api/people/1/",
			"https://swapi.dev/api/people/2/",
		],
		films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/3/"],
		url: "https://swapi.dev/api/planets/1/",
	};

	const mockResidents = [
		{ name: "Luke Skywalker", url: "https://swapi.dev/api/people/1/" },
		{ name: "C-3PO", url: "https://swapi.dev/api/people/2/" },
	];

	const mockFilms = [
		{ title: "A New Hope", url: "https://swapi.dev/api/films/1/" },
		{ title: "Return of the Jedi", url: "https://swapi.dev/api/films/3/" },
	];

	beforeEach(() => {
		cy.intercept("GET", "**/api/planets/1", { body: mockPlanet }).as(
			"getPlanet"
		);
		cy.intercept("GET", "**/api/people/1", { body: mockResidents[0] }).as(
			"getResident1"
		);
		cy.intercept("GET", "**/api/people/2", { body: mockResidents[1] }).as(
			"getResident2"
		);
		cy.intercept("GET", "**/api/films/1", { body: mockFilms[0] }).as(
			"getFilm1"
		);
		cy.intercept("GET", "**/api/films/3", { body: mockFilms[1] }).as(
			"getFilm3"
		);
	});

	context("Successful Load", () => {
		it("should display planet details correctly", () => {
			cy.visit("/planets/1");

			cy.getByData("planet-details-card").within(() => {
				cy.contains("Climate").next().should("have.text", "arid");
				cy.contains("Population").next().should("have.text", "200000");
				cy.contains("Diameter").next().should("have.text", "10465 km");
			});
		});

		it("should display related films", () => {
			cy.visit("/planets/1");

			cy.getByData("films-section").within(() => {
				cy.contains("A New Hope").should("be.visible");
				cy.contains("Return of the Jedi").should("be.visible");
			});
		});

		it("should navigate back to planets list", () => {
			cy.visit("/planets/1");
			cy.getByData("back-button").click();
			cy.url().should("include", "/planets");
		});
	});

	context("Loading States", () => {
		it("should show loading spinner initially", () => {
			cy.intercept("GET", "**/api/planets/1", {
				delay: 1000,
				body: mockPlanet,
			});
			cy.visit("/planets/1");
			cy.getByData("loading").should("be.visible");
		});
	});

	context("Edge Cases", () => {
		it("should handle unknown population value", () => {
			cy.intercept("GET", "**/api/planets/1", {
				body: { ...mockPlanet, population: "unknown" },
			});
			cy.visit("/planets/1");

			cy.contains("Population").next().should("have.text", "unknown");
		});
	});
});
