module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": 0,
        "react/prop-types": "off",
        "react/forbid-prop-types": 0,
        "react/display-name": "off",
        "react/display-name": 0
    },
    "ignorePatterns": [
        'src/components/Home.test.js',
        'src/components/admin-module/test/AdminPage.test.js',
        'src/serviceWorker.js'], // <<< ignore all files in test folder

};
