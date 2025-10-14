import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig((m) => {
    return {
        plugins: [vue(), tailwindcss()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "@@": fileURLToPath(new URL(".", import.meta.url)),
            },
        },
        define: {
            "import.meta.dev": m.mode == "development",
        },
        server: {
            port: 3000,
            allowedHosts: true,
        },
        preview: {
            port: 3000,
        },
        build: {
            target: "es2022",
        },
    };
});
