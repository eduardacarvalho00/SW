import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import { Home } from "@pages/Home";
const NotFound = loadable(() => import("@pages/NotFound"));

export const MainRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
};
