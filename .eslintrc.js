module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['warn', {
      allowArgumentsExplicitlyTypedAsAny: true,
    }],
    "import/no-unresolved": ['error', {
      ignore: [
        "@nnest/*"
      ]
    }],
    "import/no-extraneous-dependencies": ["error", {devDependencies: true}]
    // '@typescript-eslint/ban-types': ["error", {
    //   types: {
    //     'object': {
    //       message: "Don't use 'object' as a type. Use Record<string, unknown> instead",
    //       fixWith: "Record<string, unknown>"
    //     }
    //   }
    // }]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
