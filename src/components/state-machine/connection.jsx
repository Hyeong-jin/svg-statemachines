var React = require('react/addons');
var l = require('lodash');

var T = React.PropTypes;
var AreaType = T.shape({
  x: T.number.isRequired,
  y: T.number.isRequired,
  w: T.number.isRequired,
  h: T.number.isRequired
});

function absolute(x) {
  return (x < 0) ? -x : x;
}

function rectSides(rect) {
  return [
    {x: rect.x + (rect.w / 2), y: rect.y, name: 'top'},
    {x: rect.x + (rect.w / 2), y: (rect.y + rect.h), name: 'bottom'},
    {x: rect.x, y: rect.y + (rect.h / 2), name: 'left'},
    {x: (rect.x + rect.w), y: rect.y + (rect.h / 2), name: 'right'}
  ];
}

function distance({start, end}) {
  var dx = end.x - start.x;
  var dy = end.y - start.y;
  return Math.sqrt(dx * dx + dy * dy);
}

var State = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    id: T.string.isRequired,
    from: AreaType.isRequired,
    to: AreaType.isRequired
  },

  render() {
    var from = this.props.from;
    var to = this.props.to;

    var startPoints = rectSides(from);
    var endPoints = rectSides(to);

    var possibleConnections = l(startPoints)
    .map(function (start) {
      return endPoints.map(function (end) {
        return {start, end};
      });
    })
    .flatten()
    .value();

    var connection = l.min(possibleConnections, distance);

    var start = connection.start;
    var end = connection.end;

    var path = [
      "M" + (start.x) + " " + (start.y),
      (start.name === 'left' ? "H" + (start.x - 10) : ""),
      (start.name === 'right' ? "H" + (start.x + 10) : ""),
      (start.name === 'top' ? "V" + (start.y - 10) : ""),
      (start.name === 'bottom' ? "V" + (start.y + 10) : ""),
      (end.name === 'left' ? "H" + (end.x - 10) : ""),
      (end.name === 'right' ? "H" + (end.x + 10) : ""),
      (end.name === 'top' ? "V" + (end.y - 10) : ""),
      (end.name === 'bottom' ? "V" + (end.y + 10) : ""),
      (end.name === 'left' || end.name === 'right' ? ("V" + end.y) : ""),
      "H" + (end.x),
      "V" + (end.y)
    ].join(' ');

    return (
      <path d={path} className="connection" />
    );
  }
});

module.exports = State;
