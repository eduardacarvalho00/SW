describe("Characters Page", () => {
	const mockCharacters = {
		results: [
			{
				name: "Luke Skywalker",
				gender: "male",
				birth_year: "19BBY",
				url: "https://swapi.dev/api/people/1/",
			},
			{
				name: "Leia Organa",
				gender: "female",
				birth_year: "19BBY",
				url: "https://swapi.dev/api/people/5/",
			},
		],
		count: 82,
	};

	beforeEach(() => {
		cy.intercept("GET", "**/api/people*", { body: mockCharacters }).as(
			"getCharacters"
		);
		cy.visit("/characters");
	});

	context("Initial Load", () => {
		it("should display the page title and initial content", () => {
			cy.contains("h1", "Characters").should("be.visible");
			cy.contains("p", "Explore characters from the Star Wars universe");
		});

		it("should load and display initial characters", () => {
			cy.getByData("character-card").should("have.length", 2);
			cy.contains("Luke Skywalker").should("be.visible");
			cy.contains("Leia Organa").should("be.visible");
		});

		it("should show loading state while fetching data", () => {
			cy.intercept("GET", "**/api/people*", {
				delay: 1000,
				body: mockCharacters,
			});
			cy.visit("/characters");
			cy.getByData("loading").should("be.visible");
		});
	});

	context("Search Functionality", () => {
		it("should filter characters when typing in search input", () => {
			cy.getByData("search-input").type("luke");
			cy.getByData("character-card").should("have.length", 1);
			cy.contains("Luke Skywalker").should("be.visible");
		});

		it("should show empty state when no matches found", () => {
			cy.intercept("GET", "**/api/people*", {
				body: { results: [], count: 0 },
			});
			cy.getByData("search-input").type("invalidsearch");
			cy.getByData("empty-state").should("be.visible");
		});
	});
});
