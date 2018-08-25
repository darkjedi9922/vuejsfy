var fs = require('fs');

var filename = process.argv[2];
var pathParts = filename.split('/');
var componentName = pathParts[pathParts.length - 1].split('.')[0];

// Если файла нет, он создается, все его содержимое очищается
var destDirname = pathParts.slice(0, pathParts.length - 1).join('/');
var destFileDescriptor = fs.openSync(destDirname + '/' + componentName + '.vue.js', 'w');

var vueFileContent = fs.readFileSync(filename, 'utf-8');
fs.writeSync(destFileDescriptor, assembleComponent(componentName, vueFileContent));
fs.closeSync(destFileDescriptor);

function assembleComponent(componentName, vueFileContent) {
    var body = loadScriptBody(vueFileContent);
    var template = "template: '" + loadTemplate(vueFileContent).replace(/'/g, "\\'") + "',";
    body = body.replace('{', '{\n    ' + template);
    return "Vue.component('" + componentName + "', " + body + ");";
}

function loadScriptBody(text) {
    var start = text.indexOf('<script>') + '<script>'.length;
    var end = text.indexOf('</script>');
    var result = text.slice(start, end);
    return result.replace('export', '').replace('default', '').trim();
}

function loadTemplate(text) {
    var start = text.indexOf('<template>') + '<template>'.length;
    var end = text.indexOf('</template>');
    var result = text.slice(start, end);
    return result.trim().replace('\n', '');
}
