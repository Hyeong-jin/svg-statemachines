var React = require('react/addons');

var StateMaschine = require('../state-machine');
var StateStore = require('../../stores/states');

var EditView = React.createClass({
  getInitialState() {
    return {states: StateStore.getAll()};
  },
  componentWillMount() {
    StateStore.on('change', this._handleChange);
  },
  componentWillUnmount() {
    StateStore.off('change', this._handleChange);
  },
  _handleChange() {
    var states = StateStore.getAll();
    this.setState({states: states});
  },

  render() {
    var states = this.state.states;

    return (
      <article>
        <StateMaschine key="state-maschine" states={states} />
      </article>
    );
  }
});

module.exports = EditView;
