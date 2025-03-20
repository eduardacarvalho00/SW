/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	prefix: "",
	theme: {
		extend: {
			colors: {
				background: "#020817",
				foreground: "#ededed",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
