/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
				nunito: ['Nunito', 'sans-serif']
			},
			colors: {
				customgreen: {
					100: "#eaf2ea",
					200: "#f3faf1",
					300: "#dceedc",
					700: "#4e8750",
					800: "#3a643b",
				},
				customgray: {
					100: "#1F1F1F",
					200: "#bdbdbd",
					300: "#cdcdcd",
					400: "#8d8d8d",
					500: "#7b7b7b",
					700: "#474747",
				},
				customyellow: {
					200: "#fff7e2",
				},
				customred: {
					500: "#d85454",
				},
				oldlace: "#fff7e2",
				ghostWhite: "#F7F7FC",
				mintcream: {
					200: "#FFFBF2",
				},

				darkolivegreen: {
					100: "rgba(58, 100, 59, 0.39)",
					200: "#3a643b",
					300: "#4e8750",
				},
				lightolivegreen: "#f2fbf2",
				seagreen: "#618a61",
				darkslategray: {
					100: "#474747",
					200: "#3c3c3c",
					300: "#2e2f2e",
				},
				dimgray: {
					100: "#646665",
					200: "#656565",
					300: "#585858",
				},
				"primary-tint-1": "#ddefdd",
				"primary-tint-2": "#eaf2ea",
				black: "#000",
				whitesmoke: {
					100: "#f4f4f4",
					200: "#ededed",
				},
				honeydew: "#dceedc",
				beige: "rgba(207, 235, 207, 0.5)",
				lightgray: {
					100: "#d4d4d4",
					200: "#cdcdcd",
				},
				gray: {
					100: "#7b7b7b",
					200: "#767676",
				},
				antiquewhite: "#e6dec9",
			},
		},
	},
	plugins: [],
};
