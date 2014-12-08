var React = require('react/addons');
var T = React.PropTypes;

var SvgImage = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    x: T.number.isRequired,
    y: T.number.isRequired,
    w: T.number.isRequired,
    h: T.number.isRequired,
    bg: T.string.isRequired
  },

  componentDidMount() {
    if (this.props.bg) {
      this.getDOMNode().setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href', this.props.bg
      );
    }
  },

  render() {
    return React.createElement('image', {
      x: this.props.x,
      y: this.props.y,
      width: this.props.w,
      height: this.props.h
    });
  }
});

module.exports = SvgImage;
