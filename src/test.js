require('node-jsx').install({extension: '.jsx', harmony: true});

var React = require('react');
var jsdom = require("jsdom");

function dom(markup) {
  if (global.document) { return; }
  if (!markup) {
    markup = '<html><body></body></html>';
  }
  global.document = jsdom.jsdom(markup, jsdom.level(1, 'core'));
  global.window = global.document.parentWindow;
  global.navigator = global.window.navigator;
}

function resetDom(done) {
  // cf. http://www.asbjornenge.com/wwc/testing_react_components.html
  React.unmountComponentAtNode(document.body);
  document.body.innerHTML = "";
  setTimeout(done);
}

module.exports = {
  dom: dom,
  resetDom: resetDom
};
