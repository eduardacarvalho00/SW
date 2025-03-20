export interface PlanetResponse {
	name: string;
	rotation_period: string;
	orbital_period: string;
	diameter: string;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: string;
	population: string;
	residents: string[];
	films: string[];
	url: string;
}
export interface AllPlanetsResponse {
	count: number;
	next: string;
	previous: null;
	results: PlanetResponse[];
}
