module.exports = {
    env: {
        es2021: true,
        node: true,
        "react-native/react-native": true
    },
    extends: [
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb",
        "airbnb/hooks",
        "prettier",
        "plugin:prettier/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react", "react-native", "@typescript-eslint"],
    settings: {
        "import/resolver": {
            alias: {
                map: [["~", "./src"]],
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    rules: {
        "react/require-default-props": "off",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "no-use-before-define": ["error", { variables: false }],
        "react/prop-types": ["error", { ignore: ["navigation", "navigation.navigate"] }],
        "@typescript-eslint/no-unused-vars": ["error"],
        "no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "import/prefer-default-export": "off",
        "react/function-component-definition": "off",
        "no-var": "error",
        "@typescript-eslint/no-explicit-any": "error",
        semi: ["error", "always"],
        "no-multiple-empty-lines": ["error", { max: 1 }],
        "no-trailing-spaces": ["error"],
        "no-console": "warn",
        quotes: ["error", "double"],
        "no-shadow": "error",
        eqeqeq: ["error", "always"],
        "no-empty-function": ["error"],
        "react/display-name": "off",
        "eol-last": ["error", "always"],
        "prefer-const": "error",
        "arrow-body-style": ["error", "as-needed"],
        "no-duplicate-imports": "error",
        "consistent-return": "error",
        "no-undef": "error",
        "object-shorthand": ["error", "always"],
        camelcase: ["error", { properties: "always" }],
        "no-else-return": "error",
        "import/no-commonjs": "off",
        "import/export": "off",
        "import/extensions": [
            "off",
            "ignorePackages",
            {
                ts: "never",
                tsx: "never",
                js: "never",
                jsx: "never"
            }
        ],
        "import/no-cycle": "off",
        "import/no-unresolved": "off"
    }
};
