var React = require('react/addons');
var T = React.PropTypes;
var Dispatcher = require('../../dispatcher');

var SvgImage = require('../svg/image');

var State = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    x: T.number.isRequired,
    y: T.number.isRequired,
    w: T.number.isRequired,
    h: T.number.isRequired,
    bg: T.string.isRequired,
    connections: T.arrayOf(T.shape({
      x: T.number.isRequired,
      y: T.number.isRequired,
      w: T.number.isRequired,
      h: T.number.isRequired
    }))
  },

  activateDrag() {
    event.stopPropagation();

    if (event.button !== 0) {
      return;
    }

    var pos = event.touches ? event.touches[0] : event;
    this.mouse = {
      x: pos.pageX,
      y: pos.pageY
    };

    window.addEventListener("mousemove", this.handleDrag);
    window.addEventListener("mouseup", this.deactivateDrag);
  },

  handleDrag(event) {
    event.stopPropagation();

    var pos = event.touches ? event.touches[0] : event;
    var move = {
      x: pos.pageX,
      y: pos.pageY
    };

    var data = {
      x: this.props.x - (this.mouse.x - move.x),
      y: this.props.y - (this.mouse.y - move.y)
    };

    Dispatcher.dispatch({
      type: 'STATE_MOVE',
      query: {id: this.props.id},
      data: data
    });

    this.mouse = move;
  },

  deactivateDrag() {
    event.stopPropagation();

    window.removeEventListener("mousemove", this.handleDrag);
    window.removeEventListener("mouseup", this.deactivateDrag);
  },

  render() {
    var p = this.props;

    var clickAreas = (p.connections || []).map(function (c) {
      return (
        <rect className="area" key={c.id}
          x={c.x} y={c.y} width={c.w} height={c.h} />
      );
    });

    return (
      <g transform={'translate('+ p.x + ', ' + p.y +')'}
        width={p.w} height={p.h} onMouseDown={this.activateDrag}>
        <SvgImage {...p} key="bg" x={0} y={0}/>
        {clickAreas}
      </g>
    );
  }
});

module.exports = State;
