var React = require('react');
var Router = require('react-router');

window.React = React;

var routes = require('./components/routes');

var router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

if (process.env.BROWSER) {
  // kick of the rendering!
  router.run(function (Handler) {
    React.render(
      <Handler data={{id: 42}}/>,
      document.getElementById('container')
    );
  });
}

module.exports = router.run.bind(router);
