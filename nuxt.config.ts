// https://nuxt.com/docs/api/configuration/nuxt-config
// import svgLoader from "vite-svg-loader";
const sw = process.env.SW === "true";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: false },
	ssr: false,
	app: {
		keepalive: {
			exclude: [],
		},
		head: {
			htmlAttrs: {
				lang: 'en'
			},
			charset: "utf-8",
			meta: [
				{
					name: "theme-color",
					media: "(prefers-color-scheme: light)",
					content: "#0F3877",
				},
				{ name: "color-scheme", content: "light dark" },
				{ name: "description", content: "The closest Windows OS can be on the web" },
				{ name: "keywords", content: "Windows 11, Windows OS, WinWeb, Windows on Web" },
				{ name: "twitter:image", content: "/icons/windows_11.svg" },
				{ name: "twitter:image:alt", content: "WinWeb" },
				{
					name: "viewport",
					content: "viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0",
				},
				{ name: "mobile-web-app-capable", content: "yes" },
			],
			link: [
				{
					rel: 'icon',
					href: '/icons/windows_11.svg',
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com"
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous"
				},
				{
					href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gothic+A1:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@500;700&display=swap",
					rel: "stylesheet"
				}
			],
			title: "WinWeb",
			base: { href: "/" },
		},
	},
	imports: {
		dirs: ['./composables/**', './utils/**', '.stores/**', 'types/**'],
	},
	modules: [
		"@pinia/nuxt",
		"@nuxt/icon",
		// "@primevue/nuxt-module",
		"@vite-pwa/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/tailwindcss",
	],
	icon: {
		mode: "svg",
	},
	css: ["~/assets/css/main.css"],
	// primevue: {
	// 	components: {
	// 		prefix: "Prime",
	// 	},
	// 	composables: {
	// 		exclude: "*",
	// 	},
	// 	directives: {
	// 		prefix: "p",
	// 		include: ["Ripple", "Tooltip"] /* Used as v-pripple and v-ptooltip */,
	// 	},
	// 	// usePrimeVue: false,
	// },
	vue: {
		compilerOptions: {
			comments: false,
		},
	},
	pwa: {
		registerWebManifestInRouteRules: false,
		manifest: {
			name: "WinWeb",
			short_name: "WinWeb",
			description: "The closest Window OS can be on the web",
			theme_color: "#ffffff",
			icons: [],
			display: "minimal-ui",
		},
		registerType: "autoUpdate",
		strategies: sw ? "injectManifest" : "generateSW",
		srcDir: sw ? "service-worker" : undefined,
		filename: sw ? "sw.ts" : undefined,
		client: {
			installPrompt: true,
		},
	},
	nitro: {
		esbuild: {
			options: {
				target: "node18",
			},
		},
		preset: 'vercel-static'
	},
	vite: {
		plugins: [
			// svgLoader({
			// 	svgo: false,
			// }),
		],
		build: {
			target: 'es2022'
		},
	},
});
