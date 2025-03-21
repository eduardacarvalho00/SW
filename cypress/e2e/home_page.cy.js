import "../support/commands";

describe("The Home Page", () => {
	beforeEach(() => {
		// Mock APIs
		cy.intercept("GET", "https://swapi.dev/api/people", {
			fixture: "characters.json",
		}).as("getCharacters");
		cy.intercept("GET", "https://swapi.dev/api/planets", {
			fixture: "planets.json",
		}).as("getPlanets");

		cy.visit("/");
	});

	context("main section", () => {
		it("shows the right welcome text", () => {
			cy.getByData("welcome-home").contains(
				"Welcome to the Star Wars Explorer. Discover characters and planets from the Star Wars universe."
			);
		});

		it("shows the Characters card with correct data", () => {
			cy.getByData("characters-card").within(() => {
				cy.contains("Characters").should("exist");
				cy.get("svg").should("exist");
				cy.contains("82");
				cy.contains("Explore characters from the Star Wars universe");
				cy.get("a").should("have.attr", "href", "/characters");
			});
		});

		it("shows the Planets card with correct data", () => {
			cy.getByData("planets-card").within(() => {
				cy.contains("Planets").should("exist");
				cy.get("svg").should("exist");
				cy.contains("60");
				cy.contains("Discover planets from the Star Wars universe");
				cy.get("a").should("have.attr", "href", "/planets");
			});
		});

		it("shows the Favorites card with correct sum", () => {
			cy.wait(100);

			cy.getByData("favorites-card").within(() => {
				cy.contains("Favorites").should("exist");
				cy.contains("0").should("exist");
			});
		});

		it("navigates correctly through links", () => {
			cy.getByData("characters-card").find("a").click();
			cy.url().should("include", "/characters");

			cy.go("back");

			cy.getByData("planets-card").find("a").click();
			cy.url().should("include", "/planets");

			cy.go("back");

			cy.getByData("favorites-card").find("a").click();
			cy.url().should("include", "/favorites");
		});

		it("shows the About section correctly", () => {
			cy.getByData("about-section").within(() => {
				cy.contains("h2", "About Star Wars Explorer");
				cy.contains("p", "This application allows you to explore");
				cy.contains("h3", "Get Started");
				cy.contains("navigation bar");
			});
		});
	});

	context("loading state", () => {
		it("shows the spinner during loading", () => {
			cy.intercept("GET", "**/api/people*", (req) => {
				req.reply({
					delay: 1000,
					fixture: "characters.json",
				});
			});

			cy.intercept("GET", "**/api/planets*", (req) => {
				req.reply({
					delay: 1000,
					fixture: "planets.json",
				});
			});

			cy.visit("/");
			cy.get("[data-test=loading]").should("be.visible");
		});
	});
});
