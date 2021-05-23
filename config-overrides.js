const path = require('path');

module.exports = {
    paths: (paths, env) => {
        paths.appIndexJs = path.resolve(__dirname, 'nest_frontend/index.js');
        paths.appSrc = path.resolve(__dirname, 'nest_frontend');
        return paths;
    },

    jest: (config) => {
        config.roots = config.roots.map(root => root.replace("src", "nest_frontend"))
        config.collectCoverageFrom = config.collectCoverageFrom.map(root => root.replace("src", "nest_frontend"))
        config.testMatch = config.testMatch.map(root => root.replace("src", "nest_frontend"))
        console.debug(config)
        return config;
    }
}