import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { Character } from "@pages/Character";
import { Home } from "@pages/Home";
import { CharacterDetails } from "@pages/Character/CharacterDetails";
import { Planet } from "@pages/Planet";
import { PlanetDetails } from "@pages/Planet/PlanetDetails";
import Favorite from "@pages/Favorite";
import { Specie } from "@pages/Specie";
const NotFound = loadable(() => import("@pages/NotFound"));

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/characters" element={<Character />} />
			<Route path="/characters/:characterId" element={<CharacterDetails />} />
			<Route path="/planets" element={<Planet />} />
			<Route path="/planets/:planetId" element={<PlanetDetails />} />
			<Route path="/favorites" element={<Favorite />} />
			<Route path="/species/:specieId" element={<Specie />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
};
