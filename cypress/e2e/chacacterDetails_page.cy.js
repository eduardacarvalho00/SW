describe("Character Details Page", () => {
	const mockCharacter = {
		name: "Luke Skywalker",
		species: "Human",
		gender: "male",
		birth_year: "19BBY",
		height: "172",
		mass: "77",
		hair_color: "blond",
		eye_color: "blue",
		films: ["https://swapi.dev/api/films/1/", "https://swapi.dev/api/films/2/"],
		homeworld: "https://swapi.dev/api/planets/1/",
		url: "https://swapi.dev/api/people/1/",
	};

	const mockFilms = [
		{ title: "A New Hope", url: "https://swapi.dev/api/films/1/" },
		{ title: "The Empire Strikes Back", url: "https://swapi.dev/api/films/2/" },
	];

	const mockHomeworld = {
		name: "Tatooine",
		climate: "arid",
		terrain: "desert",
		population: "200000",
		url: "https://swapi.dev/api/planets/1/",
	};

	beforeEach(() => {
		cy.intercept("GET", "**/api/people/1", { body: mockCharacter }).as(
			"getCharacter"
		);
		cy.intercept("GET", "**/api/films/1", { body: mockFilms[0] }).as(
			"getFilm1"
		);
		cy.intercept("GET", "**/api/films/2", { body: mockFilms[1] }).as(
			"getFilm2"
		);
		cy.intercept("GET", "**/api/planets/1", { body: mockHomeworld }).as(
			"getHomeworld"
		);
	});

	context("Successful Load", () => {
		it("should display character details correctly", () => {
			cy.visit("/characters/1");

			cy.getByData("character-details-card").within(() => {
				cy.contains("Species").next().should("have.text", "Human");
				cy.contains("Height").next().should("have.text", "172 inch");
				cy.contains("Mass").next().should("have.text", "77 lb");
			});
		});

		it("should display related films", () => {
			cy.visit("/characters/1");

			cy.getByData("films-section").within(() => {
				cy.contains("A New Hope").should("be.visible");
				cy.contains("The Empire Strikes Back").should("be.visible");
			});
		});

		it("should display homeworld information", () => {
			cy.visit("/characters/1");

			cy.getByData("homeworld-card").within(() => {
				cy.contains("Tatooine").should("be.visible");
				cy.contains("Climate").next().should("have.text", "arid");
				cy.getByData("planet-link").should("have.attr", "href", "/planets/1");
			});
		});
	});

	context("Navigation", () => {
		it("should navigate back to characters list", () => {
			cy.visit("/characters/1");
			cy.getByData("back-button").click();
			cy.url().should("include", "/characters");
		});

		it("should navigate to homeworld details", () => {
			cy.visit("/characters/1");
			cy.getByData("planet-link").click();
			cy.url().should("include", "/planets/1");
		});
	});

	context("Loading States", () => {
		it("should show main loading spinner", () => {
			cy.intercept("GET", "**/api/people/1", {
				delay: 1000,
				body: mockCharacter,
			});
			cy.visit("/characters/1");
			cy.getByData("loading").should("be.visible");
		});

		it("should show films loading state", () => {
			cy.intercept("GET", "**/api/films/*", {
				delay: 1500,
				body: mockFilms[0],
			});
			cy.visit("/characters/1");
			cy.getByData("films-section").within(() => {
				cy.getByData("loading").should("be.visible");
			});
		});
	});

	context("Error Handling", () => {
		it("should handle missing homeworld", () => {
			cy.intercept("GET", "**/api/people/1", {
				body: { ...mockCharacter, homeworld: null },
			});
			cy.visit("/characters/1");
			cy.getByData("homeworld-card").should("not.exist");
		});
	});

	context("Edge Cases", () => {
		it("should handle unknown birth year", () => {
			cy.intercept("GET", "**/api/people/1", {
				body: { ...mockCharacter, birth_year: "unknown" },
			});
			cy.visit("/characters/1");
			cy.contains("Birth Year").next().should("have.text", "unknown");
		});

		it("should handle missing films", () => {
			cy.intercept("GET", "**/api/people/1", {
				body: { ...mockCharacter, films: [] },
			});
			cy.visit("/characters/1");
			cy.getByData("films-section").should("not.contain", "A New Hope");
		});
	});
});
