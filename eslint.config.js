import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    extends: [
      "plugin:react/recommended",
      'plugin:prettier/recommended',
      'plugin:typescript-eslint/recommended',
      'prettier'
    ],
    plugins: [
      "react", 
      "@typescript-eslint", 
      "prettier"
    ],
    rules: {
      "prettier/prettier": "error", // 开启规则
      quotes: "error"
    }
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]