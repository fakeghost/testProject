module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
}