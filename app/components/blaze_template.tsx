/* global Blaze */
import * as React from 'react';

export default React.createClass({
  propTypes: {
    template: React.PropTypes.any.isRequired,
    //component: React.PropTypes.any,
  },

  getDefaultProps() {
    return {
      template: null,
    };
  },

  // we don't want to re-render this component if parent changes
  shouldComponentUpdate() {
    return false;
  },

  componentDidMount() {
    this.view = Blaze.render(this.props.template, React.findDOMNode(this.refs.root));
  },

  componentWillUnmount() {
    Blaze.remove(this.view);
  },

  render() {
    // let component = this.props.component;
    let props = this.props;
    return <span ref="root" {...props} />; // desctructuring in typescript does not work well
  },
});
