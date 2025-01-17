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
			charset: "utf-8",
			meta: [
				{
					name: "theme-color",
					media: "(prefers-color-scheme: light)",
					content: "#0F3877",
				},
				{ name: "color-scheme", content: "light dark" },
				{
					name: "viewport",
					content:
						"viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no",
				},
				{ name: "format-detection", content: "telephone=no" },
				{ name: "msapplication-tap-highlight", content: "no" },
				{ name: "mobile-web-app-capable", content: "yes" },
				{ name: "apple-mobile-web-app-title", content: "winweb" },
			],
			// link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
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
			description: "The closest Windows 11 can be on the web",
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
	},
	vite: {
		plugins: [
			// svgLoader({
			// 	svgo: false,
			// }),
		],
		build: {
			target: 'esnext'
		},
	},
});
