export interface CharacterResponse {
	birth_year: string;
	eye_color: string;
	gender: string;
	hair_color: string;
	height: string;
	homeworld: string;
	mass: string;
	name: string;
	skin_color: string;
	created: string;
	edited: string;
	species: string[];
	starships: string[];
	vehicles: string[];
	url: string;
	films: string[];
}

export interface AllCharactersResponse {
	count: number;
	next: string;
	previous: null;
	results: CharacterResponse[];
}
