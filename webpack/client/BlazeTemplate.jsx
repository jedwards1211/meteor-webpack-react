import React from 'react';

export default React.createClass({
  propTypes: {
    template:   React.PropTypes.any.isRequired,
    component:  React.PropTypes.any,
  },
  getDefaultProps() {
    return {
      component: 'div',
    };
  },
  componentDidMount() {
    this.view = Blaze.render(this.props.template, React.findDOMNode(this.refs.root));
  },
  componentWillUnmount() {
    Blaze.remove(this.view);
  },
  render() {
    var {component, ...props} = this.props;
    props.ref = 'root';

    return React.createElement(
      component,
      props);
  },
});