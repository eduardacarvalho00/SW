/// <reference types="vitest/config" />
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
	build: {
		target: "es2022",
	},
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	resolve: {
		alias: {
			"@api": path.resolve(__dirname, "./src/api"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@configs": path.resolve(__dirname, "./src/configs"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@contexts": path.resolve(__dirname, "./src/contexts"),
			"@env": path.resolve(__dirname, "./src/env"),
			"@errors": path.resolve(__dirname, "./src/errors"),
			"@hooks": path.resolve(__dirname, "./src/hooks"),
			"@interfaces": path.resolve(__dirname, "./src/interfaces"),
			"@locale": path.resolve(__dirname, "./src/locale"),
			"@mutations": path.resolve(__dirname, "./src/mutations"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@queries": path.resolve(__dirname, "./src/queries"),
			"@routes": path.resolve(__dirname, "./src/routes"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@validations": path.resolve(__dirname, "./src/validations"),
			"@": path.resolve(__dirname, "./src"),
			"@layouts": path.resolve(__dirname, "./src/layouts"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		coverage: {
			reporter: ["text", "json", "html"],
		},
	},
});
