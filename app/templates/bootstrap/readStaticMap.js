export default app => {
    const assets = require('../assets')
    app.context.renderStaticFile = null

    app.context.renderStaticFile = async pageName => {
        pageName = pageName || 'index'
        let jsOutput = []
        let cssOutput = []

        if (assets[pageName] && assets[pageName]) {
            jsOutput.push(getOutput('common', 'js', assets))
            jsOutput.push(getOutput('vendor', 'js', assets))
            jsOutput.push(getOutput(pageName, 'js', assets))
        }
        if (assets[pageName] && assets[pageName] && assets[pageName]['css']) {
            cssOutput.push(getOutput(pageName, 'css', assets))
        }
        return {
            js: jsOutput,
            css: cssOutput
        }
    }
}

function getOutput (pageName, fileType, map) {
    let output = ''
    switch (fileType) {
    case 'js':
        output = map[pageName].js
        break
    case 'css':
        output = map[pageName].css
        break
    }
    return output
}
