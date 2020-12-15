module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": 10,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
    },
    "globals": {
        "require": true,
        "module": true,
        "import": true,
        "BMapGL": true,
        "BMapGLLib": true,
        "mapvgl": true,
        "mapv": true
    }   
};
