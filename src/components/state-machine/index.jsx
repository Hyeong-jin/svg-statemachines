var React = require('react/addons');
var T = React.PropTypes;

var State = require('./state');
var Connection = require('./connection');

var formatConnections = require('./format-connections');

var StateMachine = React.createClass({
  propTypes: {
    states: T.arrayOf(T.shape({
      id: T.string.isRequired,
      connections: T.arrayOf(T.shape({
        target: T.string.isRequired
      }))
    })).isRequired
  },

  markers: [
    '<marker id="markerCircle" markerWidth="8" markerHeight="8" refx="5" refy="5">',
      '<circle cx="5" cy="5" r="2"/>',
    '</marker>',
    '<marker id="markerBox" markerWidth="4" markerHeight="4" refx="2" refy="2">',
      '<rect x="0" y="0" width="4" height="4"/>',
    '</marker>',
    '<marker id="markerArrow" markerWidth="13" markerHeight="13" refx="2" refy="6" orient="auto">',
      '<path d="M2,2 L2,11 L10,6 L2,2"/>',
    '</marker>'
  ].join('\n'),

  render() {
    var p = this.props;
    var states = p.states.map((state) => <State {...state} key={state.id} />);

    var connections = formatConnections(p.states)
    .map((c) => <Connection {...c} key={c.id} />);

    return (
      <svg className="state-machine" width="800" height="500">
        <defs dangerouslySetInnerHTML={{__html: this.markers}}/>
        {states}
        {connections}
      </svg>
    );
  }
});

module.exports = StateMachine;
