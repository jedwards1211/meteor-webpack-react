/* global Blaze */
import React from 'react';

export default React.createClass({
  propTypes: {
    template: React.PropTypes.any.isRequired,
    component: React.PropTypes.any,
  },

  getDefaultProps() {
    return { component: 'div' };
  },

  componentDidMount() {
    this.view = Blaze.render(this.props.template, React.findDOMNode(this.refs.root));
  },

  // we don't want to re-render this component if parent changes
  shouldComponentUpdate() {
    return false;
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    let {component, template, ...props} = this.props;
    props.ref = 'root';
    return React.createElement( component, props);
  },
});
