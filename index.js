#!/usr/bin/env node

var directory = process.cwd();
var prompt = require('prompt');
var fs = require('fs');
var read = fs.readFileSync;
var mkdirp = require('mkdirp');

var styleTemplate = read(__dirname + '/templates/styleTemplate.scss', 'utf8');
var specTemplate = read(__dirname + '/templates/specTemplate.js', 'utf8');
var readmeTemplate = read(__dirname + '/templates/readmeTemplate.md', 'utf8');
var componentTemplate = read(__dirname + '/templates/componentTemplate.js', 'utf8');

var filename;
var componentName;
var styleExists = false;

var init = function(){
  prompt.start();

  var schema = {
    properties: {
      name : {
        description: 'What would you like to name your component?',
        type: 'string',
        pattern: /^[$A-Z_][0-9A-Z_$]*$/i,
        message: 'Name must start with a letter and have no spaces',
        default: 'Component',
        required: true
      },
    }
  };

  prompt.get(schema, function (err, result) {
    if (err) { return onErr(err) }
    componentName = result.name;
    write(componentName);
  });

  function onErr(err){
    console.log(err);
    return 1;
  }


  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  function write(componentName){
    var componentName = capitalize(componentName);

    // check if component already exists in current directory
    if (fs.existsSync(componentName)) {
      console.error('Component: ' + componentName + ' already exists, aborting!');
      return;
    }

    mkdirp.sync(componentName);

    styleTemplate = styleTemplate.replace(/{{displayName}}/g,capitalize(componentName));

    fs.writeFile(componentName + '/styles.scss', styleTemplate, function (err) {
      if (err) return console.log(err);
      console.log('writing scss');
      console.log(componentName + '/styles.scss');
    });

    specTemplate = specTemplate.replace(/{{displayName}}/g,capitalize(componentName));

    fs.writeFile(componentName + '/spec.js', specTemplate, function (err) {
      if (err) return console.log(err);
      console.log('writing unit test');
      console.log(componentName + '/spec.js');
    });

    readmeTemplate = readmeTemplate.replace(/{{displayName}}/g,capitalize(componentName));

    fs.writeFile(componentName + '/readme.md', readmeTemplate, function (err) {
      if (err) return console.log(err);
      console.log('writing readme');
      console.log(componentName + '/readme.md');
    });

    componentTemplate = componentTemplate.replace(/{{displayName}}/g,capitalize(componentName));

    fs.writeFile(componentName + '/index.jsx', componentTemplate, function (err) {
      if (err) return console.log(err);
      console.log('writing ', componentName);
      console.log(componentName + '/' + componentName + '.jsx');
    });
  }
}

module.exports = init();
