var React = require('react/addons');
var {Link} = require('react-router');

var Error404 = React.createClass({
  render() {
    return (
      <div className="page is-error is-404">
        <h1 key="headline">
          Not found.
        </h1>
        <p key="msg">
          <Link to="index">Zurück</Link>
        </p>
      </div>
    );
  }
});

module.exports = Error404;
