module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    ".eslintrc-auto-import.json",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // 要求使用 let 或 const 而不是 var
    "no-var": "error",
    'no-undef': 'off', // 组件使用autoImport，eslint 就不用检测了
    //关闭提示 useEffect 依赖项数组可能不完整。
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react/no-unused": "off", // 关闭没有引用的规则
    //props不超过两个
    "react/jsx-max-props-per-line": [2],
    // react (https://github.com/jsx-eslint/eslint-plugin-react)
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
