import perfectionist from "eslint-plugin-perfectionist";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  tseslint.configs.recommended,
  reactHooks.configs["recommended-latest"],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    rules: {
      "react/no-unknown-property": "off",
    },
    settings: { react: { version: "detect" } },
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
  }
);
