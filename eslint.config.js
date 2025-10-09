import pluginVue from "eslint-plugin-vue";
import tsPlugin from "typescript-eslint";
import pluginOxlint from "eslint-plugin-oxlint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
    { ignores: ["*.d.ts", "**/coverage", "**/dist"] },
    {
        extends: [
            ...pluginVue.configs["flat/recommended"],
            ...tsPlugin.configs["recommended"],
            ...tsPlugin.configs["strict"],
            ...pluginOxlint.configs["flat/recommended"],
        ],
        files: ["**/*.{ts,vue}"],
        languageOptions: {
            parser: "vue-eslint-parser",
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                parser: "@typescript-eslint/parser",
            },
        },
        rules: {
            "no-empty": "off",
            "vue/first-attribute-linebreak": "off",
            "vue/html-self-closing": "off",
        },
    },
);
