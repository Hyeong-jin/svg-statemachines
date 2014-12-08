var l = require('lodash');

/**
 * Format Connections
 * @param {Array} states State objects
 * @return {Array} Connections between areas in states and states
 */
function formatConnections(states) {
  return l(states)
  .map(function (state) {
    return (state.connections || []).map(function (connection) {
      var target = l.findWhere(states, {id: connection.target});
      return {
        id: (state.id + "->" + connection.target),
        from: {
          x: state.x + connection.x,
          y: state.y + connection.y,
          w: connection.w,
          h: connection.h
        },
        to: {
          x: target.x,
          y: target.y,
          w: target.w,
          h: target.h
        }
      };
    });
  })
  .flatten()
  .value();
}

module.exports = formatConnections;
