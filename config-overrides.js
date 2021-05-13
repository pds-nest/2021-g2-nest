const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'nest_frontend/index.js');
        paths.appSrc = path.resolve(__dirname, 'nest_frontend');
        paths.appPublic = path.resolve(__dirname, 'nest_frontend/public');
        return paths;
    },
}