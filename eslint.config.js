import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import jestPlugin from "eslint-plugin-jest"

import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import eslintComments from "eslint-plugin-eslint-comments";
import prettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      sonarjs,
      unicorn,
      "eslint-comments": eslintComments,
    },
    rules: {
      ...js.configs.recommended.rules, // JavaScript recommended
      ...sonarjs.configs.recommended.rules, // SonarJS rules
      ...unicorn.configs.recommended.rules, // Unicorn rules
      ...eslintComments.configs.recommended.rules, // ESLint Comments rules
      ...prettier.rules, // Prettier formatting rules
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/__tests__/**/*.js"],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "jest/prefer-expect-assertions": "off",
      "jest/no-test-return-statement": "error"
    }
  }
]);
