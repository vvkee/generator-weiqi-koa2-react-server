// ./config/cssModules/getClassName.js
var cssName = require('../cssModule.config.js')
module.exports = function getClassName(data, filename) {
    return cssName.toString('utf8');
};
