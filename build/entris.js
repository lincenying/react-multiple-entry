var fs = require('fs')
var path = require('path')
var entryPath = path.resolve(__dirname, '../src/entris')

var entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
    /\.jsx$/.test(filename) && (o[filename.replace('.jsx', '')] = path.join(entryPath, filename))
    return o
}, {})

module.exports = entris
