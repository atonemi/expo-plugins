import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/node_modules/**", "**/build/**"];

export default defineConfig({
  lint: {
    ignorePatterns,
    plugins: ["eslint", "typescript", "unicorn", "oxc", "import", "node", "promise"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "no-void": "off",
      "no-unused-vars": "off",
    },
  },
  fmt: {
    ignorePatterns,
    sortImports: {
      ignoreCase: false,
    },
  },
});
