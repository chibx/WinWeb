import pluginOxlint from "eslint-plugin-oxlint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tsPlugin from "typescript-eslint";
import parser from "vue-eslint-parser";

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
            parser: parser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parserOptions: {
                parser: tsPlugin.parser,
            },
        },
        rules: {
            "no-empty": "off",
            "vue/first-attribute-linebreak": "off",
            "vue/html-self-closing": "off",
            "vue/html-indent": "off",
            "vue/max-attributes-per-line": "off",
            "vue/html-closing-bracket-newline": "off",
            "vue/valid-v-on": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "vue/singleline-html-element-content-newline": "off",
        },
    },
);
