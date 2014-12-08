var React = require('react');
var {Route, DefaultRoute, NotFoundRoute} = require('react-router');

module.exports = (
  <Route name="index" path="/" handler={require('./pages/_base')}>
    <DefaultRoute name="edit" handler={require('./pages/edit')} />
    <NotFoundRoute handler={require('./pages/error404')} />
  </Route>
);
