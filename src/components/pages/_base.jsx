var React = require('react/addons');
var {RouteHandler} = require('react-router');

var BaseView = React.createClass({
  render() {
    return (
      <div className="page is-start">
        <RouteHandler />
      </div>
    );
  }
});

module.exports = BaseView;
