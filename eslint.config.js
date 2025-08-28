import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import perfectionist from "eslint-plugin-perfectionist";

export default [
  {
    files: ["**/*.ts*"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      ...typescript.configs["recommended"].rules,
    },
  },
  {
    ...perfectionist.configs["recommended-natural"],
    rules: {
      ...perfectionist.configs["recommended-natural"].rules,
      "perfectionist/sort-jsx-props": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: "^on*",
              groupName: "callback",
            },
          ],
          groups: ["unknown", "callback", "shorthand"],
          type: "natural",
          order: "asc",
        },
      ],
      "perfectionist/sort-objects": [
        "error",
        {
          customGroups: [
            {
              elementNamePattern: "^on*",
              groupName: "callback",
            },
          ],
          groups: ["property", "unknown", "method", "callback"],
          type: "natural",
          order: "asc",
        },
      ],
    },
  },
];
