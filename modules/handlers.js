var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log('Start upload request service');
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "lewaro.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
};

exports.show = function(request, response) {
    fs.readFile('lewaro.png', 'binary', function(error, file){
        response.writeHead(200, {
            'Content-Type': 'image/png'
        });
        response.write(file,'binary');
        response.end();
    });
}
 
exports.welcome = function(request, response) {
    console.log("Starting request services.");
    fs.readFile('templates/start.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
};

exports.error = function(request, response) {
    console.log('What can I do?');
    response.write('404 :(');
    response.end();
};