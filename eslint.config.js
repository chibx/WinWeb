import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "no-empty": "off",
    " vue/first-attribute-linebreak": "off",
  },
});
