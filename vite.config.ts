import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig((m) => {
    return {
        plugins: [
            vue({
                features: {
                    optionsAPI: false,
                },
            }),
            tailwindcss(),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "@@": fileURLToPath(new URL(".", import.meta.url)),
            },
        },
        define: {
            "import.meta.dev": JSON.stringify(m.mode == "development"),
        },
        server: {
            port: 3000,
            allowedHosts: true,
        },
        preview: {
            port: 3001,
        },
        build: {},
    };
});
