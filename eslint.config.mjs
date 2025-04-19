import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off", // if using TypeScript plugin
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in Node.js modules
            'external', // External modules (node_modules)
            'internal', // Internal modules (your own modules)
            ['sibling', 'parent'], // Sibling and parent imports
            'index', // Index files
          ],
          'newlines-between': 'always', // Enforce new lines between groups
        },
      ],
    },
  }
];

export default eslintConfig;
